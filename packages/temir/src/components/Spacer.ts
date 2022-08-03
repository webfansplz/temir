import { defineComponent, h } from '@vue/runtime-core'
import { Box } from './'

/**
 * A flexible space that expands along the major axis of its containing layout.
 * It's useful as a shortcut for filling all the available spaces between elements.
 */
export const Spacer = defineComponent({
  name: 'Spacer',
  inheritAttrs: false,
  setup() {
    return () => {
      return h(Box, {
        flexGrow: 1,
      })
    }
  },
})

