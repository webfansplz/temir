import { computed, defineComponent, h, onMounted, onUnmounted, ref } from '@vue/runtime-core'
import * as spinners from 'cli-spinners'
import type { SpinnerName } from 'cli-spinners'
import { Text } from '@temir/core'

export interface TSpinnerProps {
  /**
   * Type of a spinner.
   * See [cli-spinners](https://github.com/sindresorhus/cli-spinners) for available spinners.
   *
   * @default dots
   */
  type?: SpinnerName
}

/**
 * Spinner.
 */
const TSpinner = defineComponent<TSpinnerProps>({
  name: 'TSpinner',
  props: ([
    'type',
  ] as undefined),
  setup(props) {
    const spinner = computed(() => spinners[props.type ?? 'dots'])
    const frame = ref(0)
    let timer = null
    onMounted(() => {
      timer = setInterval(() => {
        frame.value = (frame.value + 1) % spinner.value.frames.length
      }, spinner.value.interval)
    })
    onUnmounted(() => {
      clearInterval(timer)
    })
    return () => {
      return h(Text, {}, spinner.value.frames[frame.value])
    }
  },
})

export default TSpinner
