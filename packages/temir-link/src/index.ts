import { defineComponent, getCurrentInstance, h } from '@vue/runtime-core'
import terminalLink from 'terminal-link'

export interface TLinkProps {
  url: string
  fallback?: boolean
}

/**
 * Link.
 */
const TLink = defineComponent<TLinkProps>({
  name: 'TLink',
  props: ([
    'url',
    'fallback',
  ] as undefined),
  setup(props, { slots }) {
    const instance = getCurrentInstance()
    return () => {
      const children = slots.default()
      return h('temir-text', {
        _temir_text: children,
        isInsideText: !['TBox', 'TApp'].includes(instance.parent.type.name),
        internal_transform: (text: string) => {
          return terminalLink(text, props.url, { fallback: props.fallback ?? true })
        },
      }, children)
    }
  },
})

export default TLink
