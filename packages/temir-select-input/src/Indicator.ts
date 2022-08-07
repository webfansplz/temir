import { defineComponent, h } from '@vue/runtime-core'
import { TBox, TText } from '@temir/core'
import figures from 'figures'
export interface IndicatorProps {
  isSelected?: boolean
}

/**
 * Indicator.
 */
const Indicator = defineComponent<IndicatorProps>({
  name: 'TWrap',
  props: ([
    'isSelected',
  ] as undefined),
  setup(props) {
    return () => {
      const children = props.isSelected ? h(TText, { color: 'blue' }, figures.pointer) : h(TText, {}, ' ')
      return h(TBox, {
        marginRight: 1,
      }, children)
    }
  },
})

export default Indicator
