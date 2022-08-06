import type { Component } from '@vue/runtime-core'
import { defineComponent, h, onMounted, onUnmounted, provide, ref } from '@vue/runtime-core'
import cliCursor from 'cli-cursor'
import type Temir from '../temir'

const TAB = '\t'
const SHIFT_TAB = '\u001B[Z'
const ESC = '\u001B'

export interface AppProps {
  children: Component
  instance: InstanceType<typeof Temir>
  stdin: NodeJS.ReadStream
  stdout: NodeJS.WriteStream
  stderr: NodeJS.WriteStream
  writeToStdout: (data: string) => void
  writeToStderr: (data: string) => void
  exitOnCtrlC: boolean
  onExit: (error?: Error) => void
}

interface Focusable {
  readonly id: string
  readonly isActive: boolean
}

export const App = defineComponent<AppProps>({
  name: 'TApp',
  props: (['instance', 'children', 'stdin', 'stdout', 'stderr', 'writeToStdout', 'writeToStderr', 'exitOnCtrlC', 'onExit'] as undefined),
  setup(props) {
    // Count how many components enabled raw mode to avoid disabling
    // raw mode until all components don't need it anymore
    let rawModeEnabledCount = 0

    const activeFocusId = ref<string>()
    const focusables = ref<Focusable[]>()
    const isFocusEnabled = ref<boolean>()

    provide('instance', props.instance)
    provide('exit', handleExit)
    provide('stdin', props.stdin)
    provide('setRawMode', handleSetRawMode)
    provide('isRawModeSupported', isRawModeSupported())
    provide('internal_exitOnCtrlC', props.exitOnCtrlC)

    provide('stdout', props.stdout)
    provide('stdout-write', props.writeToStdout)

    provide('stderr', props.stderr)
    provide('stderr-write', props.writeToStderr)

    provide('activeFocusId', activeFocusId)
    provide('addFocusable', addFocusable)
    provide('removeFocusable', removeFocusable)
    provide('activateFocusable', activateFocusable)
    provide('deactivateFocusable', deactivateFocusable)
    provide('enableFocus', enableFocus)
    provide('disableFocus', disableFocus)
    provide('focusNext', focusNext)
    provide('focusPrevious', focusPrevious)
    provide('focus', focus)

    onMounted(() => {
      (cliCursor as any).hide(props.stdout)
    })
    onUnmounted(() => {
      (cliCursor as any).show(props.stdout)
    })

    // Determines if TTY is supported on the provided stdin
    function isRawModeSupported(): boolean {
      return props?.stdin?.isTTY
    }

    function handleSetRawMode(isEnabled: boolean): void {
      const { stdin } = props

      if (!isRawModeSupported()) {
        if (stdin === process.stdin) {
          throw new Error(
            'Raw mode is not supported on the current process.stdin, which Temir uses as input stream by default.\nRead about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported',
          )
        }
        else {
          throw new Error(
            'Raw mode is not supported on the stdin provided to Temir.\nRead about how to prevent this error on https://github.com/vadimdemedes/ink/#israwmodesupported',
          )
        }
      }

      stdin.setEncoding('utf8')

      if (isEnabled) {
        // Ensure raw mode is enabled only once
        if (rawModeEnabledCount === 0) {
          stdin.addListener('data', handleInput)
          stdin.resume()
          stdin.setRawMode(true)
        }

        rawModeEnabledCount++
        return
      }

      // Disable raw mode only when no components left that are using it
      if (--rawModeEnabledCount === 0) {
        stdin.setRawMode(false)
        stdin.removeListener('data', handleInput)
        stdin.pause()
      }
    }

    function enableFocus(): void {
      isFocusEnabled.value = true
    }

    function disableFocus(): void {
      isFocusEnabled.value = false
    }

    function focus(id: string): void {
      const hasFocusableId = focusables.value.some(
        focusable => focusable?.id === id,
      )
      if (hasFocusableId)
        activeFocusId.value = id
    }

    function handleInput(input: string): void {
      // Exit on Ctrl+C

      if (input === '\x03' && props.exitOnCtrlC)
        handleExit()

      // Reset focus when there's an active focused component on Esc
      if (input === ESC && activeFocusId.value)
        activeFocusId.value = undefined

      if (isFocusEnabled.value && focusables.value.length > 0) {
        if (input === TAB)
          focusNext()

        if (input === SHIFT_TAB)
          focusPrevious()
      }
    }

    function handleExit(error?: Error): void {
      if (isRawModeSupported())
        handleSetRawMode(false)

      props.onExit(error)
    }

    function addFocusable(id: string, { autoFocus }: { autoFocus: boolean }): void {
      if (!activeFocusId.value && autoFocus)
        activeFocusId.value = id
      focusables.value = [
        ...focusables.value,
        {
          id,
          isActive: true,
        },
      ]
    }

    function removeFocusable(id: string): void {
      activeFocusId.value = activeFocusId.value === id ? undefined : activeFocusId.value
      focusables.value = focusables.value.filter(({ id: focusableId }) => focusableId !== id)
    }
    function activateFocusable(id: string): void {
      focusables.value = focusables.value.map((focusable) => {
        if (focusable.id !== id)
          return focusable

        return {
          id,
          isActive: true,
        }
      })
    }

    function deactivateFocusable(id: string): void {
      activeFocusId.value = activeFocusId.value === id ? undefined : activeFocusId.value
      focusables.value = focusables.value.map((focusable) => {
        if (focusable.id !== id)
          return focusable

        return {
          id,
          isActive: false,
        }
      })
    }

    function findNextFocusable(): string | undefined {
      const activeIndex = focusables.value.findIndex((focusable) => {
        return focusable.id === activeFocusId.value
      })

      for (
        let index = activeIndex + 1;
        index < focusables.value.length;
        index++
      ) {
        if (focusables.value[index]?.isActive)
          return focusables.value[index].id
      }

      return undefined
    }

    function findPreviousFocusable(): string | undefined {
      const activeIndex = focusables.value.findIndex((focusable) => {
        return focusable.id === activeFocusId.value
      })

      for (let index = activeIndex - 1; index >= 0; index--) {
        if (focusables.value[index]?.isActive)
          return focusables.value[index].id
      }

      return undefined
    }

    function focusNext(): void {
      const firstFocusableId = focusables.value[0]?.id
      const nextFocusableId = findNextFocusable()
      activeFocusId.value = nextFocusableId || firstFocusableId
    }

    function focusPrevious(): void {
      const lastFocusableId
        = focusables.value[focusables.value.length - 1]?.id
      const previousFocusableId = findPreviousFocusable()
      activeFocusId.value = previousFocusableId || lastFocusableId
    }

    return () => {
      // Override component name
      (props.children as { name: string }).name = 'TApp'
      return h(props.children)
    }
  },
})

