import originalIsCI from 'is-ci'
import type { DebouncedFunc } from 'lodash'
import { throttle } from 'lodash'
import type { Component, App as VueAppInstance } from '@vue/runtime-core'
import { defineComponent, h } from '@vue/runtime-core'
import signalExit from 'signal-exit'
import patchConsole from 'patch-console'
import ansiEscapes from 'ansi-escapes'
import autoBind from 'auto-bind'
import * as dom from './dom'
import renderer from './createRenderer'
import type { LogUpdate } from './log-update'
import logUpdate from './log-update'
import render from './renderer'
import instances from './instances'
import { App } from './components/App'

const isCI = process.env.CI === 'false' ? false : originalIsCI

export interface TemirOptions {
  stdout: NodeJS.WriteStream
  stdin: NodeJS.ReadStream
  stderr: NodeJS.WriteStream
  debug: boolean
  exitOnCtrlC: boolean
  patchConsole: boolean
  waitUntilExit?: () => Promise<void>
}

export default class Temir {
  private readonly options: TemirOptions
  private readonly log: LogUpdate
  private readonly throttledLog: LogUpdate | DebouncedFunc<LogUpdate>
  // Ignore last render after unmounting a tree to prevent empty output before exit
  private isUnmounted: boolean
  private rootNode: dom.DOMElement
  private fullStaticOutput = ''
  private lastOutput: string
  private exitPromise?: Promise<void>
  private restoreConsole?: () => void
  private readonly unsubscribeResize?: () => void
  private vueApp: VueAppInstance

  constructor(options: TemirOptions) {
    autoBind(this)

    this.options = options
    this.rootNode = dom.createNode('temir-root')
    this.rootNode.onRender = this.onRender
    this.log = logUpdate.create(options.stdout)
    this.throttledLog = options.debug
      ? this.log
      : throttle(this.log, undefined, {
        leading: true,
        trailing: true,
      })

    // Ignore last render after unmounting a tree to prevent empty output before exit
    this.isUnmounted = false

    // Store last output to only rerender when needed
    this.lastOutput = ''

    // Unmount when process exits
    this.unsubscribeExit = signalExit(this.unmount, { alwaysLast: false })

    if (options.patchConsole)
      this.patchConsole()

    if (!isCI) {
      options.stdout.on('resize', this.onRender)

      this.unsubscribeResize = () => {
        options.stdout.off('resize', this.onRender)
      }
    }
  }

  resolveExitPromise: () => void = () => { }
  rejectExitPromise: (reason?: Error) => void = () => { }
  unsubscribeExit: () => void = () => { }

  onRender: () => void = () => {
    const { output, outputHeight, staticOutput } = render(
      this.rootNode,
      // The 'columns' property can be undefined or 0 when not using a TTY.
      // In that case we fall back to 80.
      this.options.stdout.columns || 80,
    )

    // If <Static> output isn't empty, it means new children have been added to it
    const hasStaticOutput = staticOutput && staticOutput !== '\n'

    if (this.options.debug) {
      if (hasStaticOutput)
        this.fullStaticOutput += staticOutput

      this.options.stdout.write(this.fullStaticOutput ?? `${output}`)
      return
    }

    if (isCI) {
      if (hasStaticOutput)
        this.options.stdout.write(staticOutput)

      this.lastOutput = output
      return
    }

    if (hasStaticOutput)
      this.fullStaticOutput += staticOutput

    if (outputHeight >= this.options.stdout.rows) {
      this.options.stdout.write(
        (ansiEscapes as any).clearTerminal + this.fullStaticOutput + output,
      )
      this.lastOutput = output
      return
    }

    // To ensure static output is cleanly rendered before main output, clear main output first
    if (hasStaticOutput) {
      this.log.clear()
      this.options.stdout.write(staticOutput)
      this.log(output)
    }

    if (!hasStaticOutput && output !== this.lastOutput)
      this.throttledLog(output)

    this.lastOutput = output
  }

  createVueApp(node: Component) {
    const options = this.options
    /* eslint-disable @typescript-eslint/no-this-alias */
    const context = this

    const Root = defineComponent({
      setup() {
        return () => h(App, {
          stdin: options.stdin,
          stdout: options.stdout,
          stderr: options.stderr,
          writeToStdout: context.writeToStdout,
          writeToStderr: context.writeToStderr,
          exitOnCtrlC: options.exitOnCtrlC,
          instance: context,
          onExit: context.unmount,
          children: node,
        })
      },
    })

    this.vueApp = renderer.createApp(Root)
    this.vueApp.config.warnHandler = () => null
    this.vueApp.mount(this.rootNode)
  }

  render(node: Component) {
    this.rootNode = dom.createNode('temir-root')
    this.rootNode.onRender = this.onRender
    // this.vueApp?.unmount()
    this.createVueApp(node)
    this.onRender()
  }

  unmount(error?: Error | number | null): void {
    if (this.isUnmounted)
      return

    this.onRender()
    this.unsubscribeExit()

    if (typeof this.restoreConsole === 'function')
      this.restoreConsole()

    if (typeof this.unsubscribeResize === 'function')
      this.unsubscribeResize()

    // CIs don't handle erasing ansi escapes well, so it's better to
    // only render last frame of non-static output
    if (isCI)
      this.options.stdout.write(`${this.lastOutput}\n`)

    else if (!this.options.debug)
      this.log.done()

    this.isUnmounted = true

    this.vueApp?.unmount()

    instances.delete(this.options.stdout)

    if (error instanceof Error)
      this.rejectExitPromise(error)

    else
      this.resolveExitPromise()
  }

  waitUntilExit(): Promise<void> {
    if (!this.exitPromise) {
      this.exitPromise = new Promise((resolve, reject) => {
        this.resolveExitPromise = resolve
        this.rejectExitPromise = reject
      })
    }

    return this.exitPromise
  }

  clear(): void {
    if (!isCI && !this.options.debug)
      this.log.clear()
  }

  writeToStdout(data: string): void {
    if (this.isUnmounted)
      return

    if (this.options.debug) {
      this.options.stdout.write(data + this.fullStaticOutput + this.lastOutput)
      return
    }

    if (isCI) {
      this.options.stdout.write(data)
      return
    }

    this.log.clear()
    this.options.stdout.write(data)
    this.log(this.lastOutput)
  }

  writeToStderr(data: string): void {
    if (this.isUnmounted)
      return

    if (this.options.debug) {
      this.options.stderr.write(data)
      this.options.stdout.write(this.fullStaticOutput + this.lastOutput)
      return
    }

    if (isCI) {
      this.options.stderr.write(data)
      return
    }

    this.log.clear()
    this.options.stderr.write(data)
    this.log(this.lastOutput)
  }

  patchConsole(): void {
    if (this.options.debug)
      return

    this.restoreConsole = patchConsole((stream, data) => {
      if (stream === 'stdout')
        this.writeToStdout(data)

      this.writeToStderr(data)
    })
  }
}
