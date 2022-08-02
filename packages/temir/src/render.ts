import stream from 'stream'
import type { Component } from '@vue/runtime-core'
import instances from './instances'
import Temir from './temir'
import type { TemirOptions } from './temir'

export interface RenderOptions {
  /**
   * Output stream where app will be rendered.
   *
   * @default process.stdout
   */
  stdout?: NodeJS.WriteStream
  /**
   * Input stream where app will listen for input.
   *
   * @default process.stdin
   */
  stdin?: NodeJS.ReadStream
  /**
   * Error stream.
   * @default process.stderr
   */
  stderr?: NodeJS.WriteStream
  /**
   * If true, each update will be rendered as a separate output, without replacing the previous one.
   *
   * @default false
   */
  debug?: boolean
  /**
   * Configure whether Temir should listen to Ctrl+C keyboard input and exit the app. This is needed in case `process.stdin` is in raw mode, because then Ctrl+C is ignored by default and process is expected to handle it manually.
   *
   * @default true
   */
  exitOnCtrlC?: boolean

  /**
   * Patch console methods to ensure console output doesn't mix with Temir output.
   *
   * @default true
   */
  patchConsole?: boolean
}

export interface Instance {
  /**
   * Replace previous root node with a new one or update props of the current root node.
   */
  rerender: unknown
  /**
   * Manually unmount the whole Temir app.
   */
  unmount: unknown
  /**
   * Returns a promise, which resolves when app is unmounted.
   */
  waitUntilExit: unknown
  cleanup: () => void

  /**
   * Clear output.
   */
  clear: () => void
}

type RenderFunction = <Props, K extends NodeJS.WriteStream | RenderOptions>(
  tree: Component<Props>,
  options?: K
) => Instance

const getOptions = (
  stdout: NodeJS.WriteStream | RenderOptions | undefined = {},
): RenderOptions => {
  // await new Promise((resolve) => {
  //   import('stream').then(({ Stream }) => {
  //     console.log(Stream)
  //   })
  // })

  if (stdout instanceof stream.Stream) {
    return {
      stdout,
      stdin: process.stdin,
    }
  }

  return stdout
}

const getInstance = (
  stdout: NodeJS.WriteStream,
  createInstance: () => Temir,
  node,
): Temir => {
  let instance: Temir

  if (instances.has(stdout)) {
    instance = instances.get(stdout)
    instance.render(node)
  }
  else {
    instance = createInstance()
    instances.set(stdout, instance)
  }

  return instance
}

/**
   * Mount a component and render the output.
   */
const render: RenderFunction = (node, options): Instance => {
  const temirOptions: TemirOptions = {
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr,
    debug: false,
    exitOnCtrlC: true,
    patchConsole: true,
    ...getOptions(options),
  }

  const instance: Temir = getInstance(
    temirOptions.stdout,
    () => {
      const temir = new Temir(temirOptions)
      temir.createVueApp(node)
      temir.onRender()
      return temir
    },
    node,
  )

  return {
    rerender: instance.render,
    unmount: () => instance.unmount(),
    waitUntilExit: instance.waitUntilExit,
    cleanup: () => instances.delete(temirOptions.stdout),
    clear: instance.clear,
  }
}

export default render

