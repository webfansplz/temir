import { defineComponent, h } from '@vue/runtime-core'

export interface NewlineProps {
  /**
   * Number of newlines to insert.
   *
   * @default 1
   */
  readonly count?: number
}

/**
 * Adds one or more newline (\n) characters. Must be used within <Text> components.
 */
export const Newline = defineComponent<NewlineProps>({
  name: 'Newline',
  props: ([
    'count',
  ] as undefined),
  setup(props) {
    return () => {
      const count = props.count ?? 1
      return h('temir-text', {
        _temir_newline: '\n'.repeat(count),
      })
    }
  },
})

