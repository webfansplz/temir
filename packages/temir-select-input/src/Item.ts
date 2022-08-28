import { defineComponent, h } from 'vue'
import { TText } from '@temir/core'
export interface ItemProps {
  isSelected?: boolean
  label: string
}

/**
 * SelectInputItem.
 */
const SelectInputItem = defineComponent<ItemProps>({
  name: 'TWrap',
  props: ([
    'isSelected',
    'label',
  ] as undefined),
  setup(props) {
    return () => {
      return h(TText, {
        color: props.isSelected ? 'blue' : undefined,
      }, props.label)
    }
  },
})

export default SelectInputItem
