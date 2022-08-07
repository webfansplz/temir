import { defineComponent, getCurrentInstance, h } from '@vue/runtime-core'

export interface TNewlineProps {
  /**
   * Number of newlines to insert.
   *
   * @default 1
   */
  readonly count?: number
}

/**
 * Adds one or more newline (\n) characters. Must be used within <TText> components.
 */
export const TNewline = defineComponent<TNewlineProps>({
  name: 'TNewline',
  props: ([
    'count',
  ] as undefined),
  setup(props, { slots }) {
    const instance = getCurrentInstance()
    return () => {
      const children = slots.default?.()
      const count = props.count ?? 1
      return h('temir-text', {
        _temir_text: children,
        isInsideText: !['TBox', 'TApp', 'TWrap'].includes(instance.parent.type.name),
      }, '\n'.repeat(count))
    }
  },
})

