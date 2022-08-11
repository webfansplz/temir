import type { ComponentOptions } from '@vue/runtime-core'
import { computed, defineComponent, h, ref } from '@vue/runtime-core'
import { TBox, useInput } from '@temir/core'
import arrayRotate from 'arr-rotate'
import type { ItemProps } from './Item'
import SelectInputItem from './Item'
import type { IndicatorProps } from './Indicator'
import Indicator from './Indicator'

export interface TSelectInputProps {
  /**
   * Items to display in a list. Each item must be an object and have `label` and `value` props, it may also optionally have a `key` prop.
   * If no `key` prop is provided, `value` will be used as the item key.
   */
  items?: Array<any>

  /**
   * Listen to user's input. Useful in case there are multiple input components at the same time and input must be "routed" to a specific component.
   *
   * @default true
   */
  isFocused?: boolean

  /**
   * Index of initially-selected item in `items` array.
   *
   * @default 0
   */
  initialIndex?: number

  /**
   * Number of items to display.
   */
  limit?: number

  /**
   * Custom component to override the default indicator component.
   */
  indicatorComponent?: ComponentOptions<IndicatorProps>

  /**
   * Custom component to override the default item component.
   */
  itemComponent?: ComponentOptions<ItemProps>

  /**
   * Function to call when user selects an item. Item object is passed to that function as an argument.
   */
  onSelect?: (item: any) => void

  /**
   * Function to call when user highlights an item. Item object is passed to that function as an argument.
   */
  onHighlight?: (item: any) => void
}

/**
 * TSelectInput.
 */
const TSelectInput = defineComponent<TSelectInputProps>({
  name: 'TSelectInput',
  props: ([
    'items',
    'isFocused',
    'initialIndex',
    'limit',
    'indicatorComponent',
    'itemComponent',
    'onSelect',
    'onHighlight',
  ] as undefined),
  setup(props) {
    const {
      items = [],
      isFocused = true,
      initialIndex = 0,
      limit: customLimit,
      indicatorComponent = Indicator,
      itemComponent = SelectInputItem,
      onSelect,
      onHighlight,
    } = props
    const rotateIndex = ref(0)
    function setRotateIndex(value) {
      rotateIndex.value = value
    }

    const selectedIndex = ref(initialIndex)
    function setSelectedIndex(value) {
      selectedIndex.value = value
    }

    const slicedItems = ref(null)

    const hasLimit
      = typeof customLimit === 'number' && items.length > customLimit
    const limit = hasLimit ? Math.min(customLimit!, items.length) : items.length

    function onHandle(input, key) {
      if (input === 'k' || key.upArrow) {
        const lastIndex = (hasLimit ? limit : items.length) - 1
        const atFirstIndex = selectedIndex.value === 0
        const nextIndex = hasLimit ? selectedIndex.value : lastIndex
        const nextRotateIndex = atFirstIndex ? rotateIndex.value + 1 : rotateIndex
        const nextSelectedIndex = atFirstIndex
          ? nextIndex
          : selectedIndex.value - 1

        setRotateIndex(nextRotateIndex)
        setSelectedIndex(nextSelectedIndex)

        slicedItems.value = hasLimit
          ? arrayRotate(items, nextRotateIndex).slice(0, limit)
          : items

        if (typeof onHighlight === 'function')
          onHighlight(slicedItems.value[nextSelectedIndex])
      }

      if (input === 'j' || key.downArrow) {
        const atLastIndex
          = selectedIndex.value === (hasLimit ? limit : items.length) - 1
        const nextIndex = hasLimit ? selectedIndex.value : 0
        const nextRotateIndex = atLastIndex ? rotateIndex.value - 1 : rotateIndex.value
        const nextSelectedIndex = atLastIndex ? nextIndex : selectedIndex.value + 1

        setRotateIndex(nextRotateIndex)
        setSelectedIndex(nextSelectedIndex)

        slicedItems.value = hasLimit
          ? arrayRotate(items, nextRotateIndex).slice(0, limit)
          : items

        if (typeof onHighlight === 'function')
          onHighlight(slicedItems.value[nextSelectedIndex])
      }

      if (key.return) {
        slicedItems.value = hasLimit
          ? arrayRotate(items, rotateIndex).slice(0, limit)
          : items

        if (typeof onSelect === 'function')
          onSelect(slicedItems.value[selectedIndex.value])
      }
    }

    useInput(onHandle, { isActive: isFocused })

    slicedItems.value = hasLimit
      ? arrayRotate(items, rotateIndex).slice(0, limit)
      : items

    const children = computed(() => {
      return slicedItems.value.map((item, index) => {
        const isSelected = index === selectedIndex.value
        return h(TBox, {}, [
          h(indicatorComponent, {
            isSelected,
          }),
          h(itemComponent, {
            ...item,
            isSelected,
          }),
        ],
        )
      })
    })
    return () => {
      return h(TBox, {
        flexDirection: 'column',
      }, children.value)
    }
  },
})

export default TSelectInput
