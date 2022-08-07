import type { Component } from '@vue/runtime-core'
import { computed, defineComponent, h, ref, watch } from '@vue/runtime-core'
import type { Styles } from '../dom/styles'

export interface TStaticProps {
  /**
   * Array of items of any type to render using a function you pass as a component child.
   */
  readonly items: any[]

  /**
   * Styles to apply to a container of child elements. See <Box> for supported properties.
   */
  readonly style?: Styles

  /**
   * Function that is called to render every item in `items` array.
   * First argument is an item itself and second argument is index of that item in `items` array.
   * Note that `key` must be assigned to the root component.
   */
  readonly children: (item: any, index: number) => Component
}

/**
 * `<Static>` component permanently renders its output above everything else.
 * It's useful for displaying activity like completed tasks or logs - things that
 * are not changing after they're rendered (hence the name "Static").
 *
 * It's preferred to use `<Static>` for use cases like these, when you can't know
 * or control the amount of items that need to be rendered.
 *
 * For example, [Tap](https://github.com/tapjs/node-tap) uses `<Static>` to display
 * a list of completed tests. [Gatsby](https://github.com/gatsbyjs/gatsby) uses it
 * to display a list of generated pages, while still displaying a live progress bar.
 */

export const TStatic = defineComponent<TStaticProps>({
  name: 'TStatic',
  props: ([
    'items',
    'style',
  ] as undefined),
  setup(props, { slots }) {
    const index = ref(0)
    watch(() => props.items, (v) => {
      index.value = v.length
    }, { flush: 'sync', deep: true })
    const style = computed(() => ({
      position: 'absolute',
      flexDirection: 'column',
      ...props.style,
    }))
    return () => {
      const childrens = props.items.map((item) => {
        return slots.default?.({ item })
      })
      return h('temir-box', {
        internal_static: true,
        style,
      }, childrens)
    }
  },
})
