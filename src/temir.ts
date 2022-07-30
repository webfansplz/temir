import originalIsCI from 'is-ci'
import type { DebouncedFunc } from 'lodash'
import { throttle } from 'lodash'
import ansiEscapes from 'ansi-escapes'
import type { Component } from 'vue'
import { defineComponent, h } from 'vue'
import signalExit from 'signal-exit'
import * as dom from './dom'
import renderer from './createRenderer'
import type { LogUpdate } from './log-update'
import logUpdate from './log-update'
import render from './renderer'
import App from './components/App'

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
  private readonly rootNode: dom.DOMElement
  private fullStaticOutput: string
  private lastOutput: string

  constructor(options: TemirOptions) {
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
  }

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

      this.options.stdout.write(this.fullStaticOutput + output)
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
        ansiEscapes.clearTerminal + this.fullStaticOutput + output,
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

  render(node: Component) {
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
          onExit: context.unmount,
          children: node,
        })
      },
    })

    const app = renderer.createApp(Root)
    app.config.warnHandler = function () {
      return null
    }
    app.mount(this.rootNode)
    this.onRender()
  }

  unmount() {
    this.onRender()
  }

  waitUntilExit() { }
  clear() { }

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
}
