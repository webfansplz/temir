import { inject } from '@vue/runtime-core'

/**
 * `useStdin`  which exposes stdin stream.
 */

export interface StdinProps {
  stdin: NodeJS.ReadStream
  setRawMode: (isEnabled: boolean) => void
  isRawModeSupported: boolean
  internal_exitOnCtrlC: boolean
}

export function useStdin() {
  const stdin = inject<NodeJS.ReadStream>('stdin')
  const setRawMode = inject<(isEnabled: boolean) => void>('setRawMode')
  const isRawModeSupported = inject<boolean>('isRawModeSupported')
  const internal_exitOnCtrlC = inject<boolean>('internal_exitOnCtrlC')

  return {
    stdin,
    setRawMode,
    isRawModeSupported,
    internal_exitOnCtrlC,
  }
}
