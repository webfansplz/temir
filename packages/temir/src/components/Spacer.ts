import { defineComponent, h } from '@vue/runtime-core'
import { TBox } from './'

/**
 * A flexible space that expands along the major axis of its containing layout.
 * It's useful as a shortcut for filling all the available spaces between elements.
 */
export const TSpacer = defineComponent({
  name: 'TSpacer',
  inheritAttrs: false,
  setup() {
    return () => {
      return h(TBox, {
        flexGrow: 1,
      })
    }
  },
})

