import { defineComponent, h } from '@vue/runtime-core'
import terminalLink from 'terminal-link'
import { Text } from './'

export interface LinkProps {
  url: string
  fallback?: boolean
}

/**
 * Adds one or more newline (\n) characters. Must be used within <Text> components.
 */
export const Link = defineComponent<LinkProps>({
  name: 'Link',
  props: ([
    'url',
    'fallback',
  ] as undefined),
  setup(props, { slots }) {
    return () => {
      const children = slots.default()
      return h(Text, {
        internal_transform: (text: string) => {
          return terminalLink(text, props.url, { fallback: props.fallback ?? true })
        },
      }, children)
    }
  },
})

