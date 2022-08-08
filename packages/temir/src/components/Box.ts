import { defineComponent, h } from '@vue/runtime-core'
import { identity, pickBy } from 'lodash'
import type { Styles } from '../dom/styles'

export interface TBoxProps extends Styles {
  /**
   * Margin on all sides. Equivalent to setting `marginTop`, `marginBottom`, `marginLeft` and `marginRight`.
   *
   * @default 0
   */
  readonly margin?: number

  /**
   * Horizontal margin. Equivalent to setting `marginLeft` and `marginRight`.
   *
   * @default 0
   */
  readonly marginX?: number

  /**
   * Vertical margin. Equivalent to setting `marginTop` and `marginBottom`.
   *
   * @default 0
   */
  readonly marginY?: number

  /**
   * Padding on all sides. Equivalent to setting `paddingTop`, `paddingBottom`, `paddingLeft` and `paddingRight`.
   *
   * @default 0
   */
  readonly padding?: number

  /**
   * Horizontal padding. Equivalent to setting `paddingLeft` and `paddingRight`.
   *
   * @default 0
   */
  readonly paddingX?: number

  /**
   * Vertical padding. Equivalent to setting `paddingTop` and `paddingBottom`.
   *
   * @default 0
   */
  readonly paddingY?: number
}

/**
 * `<TBox>` is an essential Temir component to build your layout. It's like `<div style="display: flex">` in the browser.
 */

export const TBox = defineComponent<TBoxProps>({
  name: 'TBox',
  props: ([
    'textWrap',
    'position',
    'margin',
    'marginX',
    'marginY',
    'marginTop',
    'marginBottom',
    'marginLeft',
    'marginRight',
    'padding',
    'paddingX',
    'paddingY',
    'paddingTop',
    'paddingBottom',
    'paddingLeft',
    'paddingRight',
    'flexGrow',
    'flexShrink',
    'flexDirection',
    'flexBasis',
    'alignItems',
    'alignSelf',
    'justifyContent',
    'width',
    'height',
    'minWidth',
    'minHeight',
    'display',
    'borderStyle',
    'borderColor',
  ] as undefined),
  inheritAttrs: false,
  setup(style, { slots }) {
    const transformedStyle = () => ({
      flexDirection: 'row',
      flexGrow: 0,
      flexShrink: 1,
      ...pickBy(style, identity),
      marginLeft: style.marginLeft || style.marginX || style.margin || 0,
      marginRight: style.marginRight || style.marginX || style.margin || 0,
      marginTop: style.marginTop || style.marginY || style.margin || 0,
      marginBottom: style.marginBottom || style.marginY || style.margin || 0,
      paddingLeft: style.paddingLeft || style.paddingX || style.padding || 0,
      paddingRight: style.paddingRight || style.paddingX || style.padding || 0,
      paddingTop: style.paddingTop || style.paddingY || style.padding || 0,
      paddingBottom: style.paddingBottom || style.paddingY || style.padding || 0,
    })

    return () => {
      const children = slots.default?.()
      return h('temir-box', {
        style: transformedStyle(),
      }, children)
    }
  },
})

