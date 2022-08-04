import { defineComponent, h } from '@vue/runtime-core'
import terminalLink from 'terminal-link'
import { TText } from './'

export interface TLinkProps {
  url: string
  fallback?: boolean
}

/**
 * Link.
 */
export const TLink = defineComponent<TLinkProps>({
  name: 'TLink',
  props: ([
    'url',
    'fallback',
  ] as undefined),
  setup(props, { slots }) {
    return () => {
      const children = slots.default()
      return h(TText, {
        internal_transform: (text: string) => {
          return terminalLink(text, props.url, { fallback: props.fallback ?? true })
        },
      }, children)
    }
  },
})

