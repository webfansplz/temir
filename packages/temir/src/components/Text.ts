import type { ForegroundColor } from 'chalk'
import chalk from 'chalk'
import { defineComponent, getCurrentInstance, h } from '@vue/runtime-core'
import colorize from '../dom/colorize'
import type { Styles } from '../dom/styles'

export interface TextProps {
  /**
   * Change text color. Temir uses chalk under the hood, so all its functionality is supported.
   */
  readonly color?: typeof ForegroundColor

  /**
   * Same as `color`, but for background.
   */
  readonly backgroundColor?: typeof ForegroundColor

  /**
   * Dim the color (emit a small amount of light).
   */
  readonly dimColor?: boolean

  /**
   * Make the text bold.
   */
  readonly bold?: boolean

  /**
   * Make the text italic.
   */
  readonly italic?: boolean

  /**
   * Make the text underlined.
   */
  readonly underline?: boolean

  /**
   * Make the text crossed with a line.
   */
  readonly strikethrough?: boolean

  /**
   * Inverse background and foreground colors.
   */
  readonly inverse?: boolean

  /**
   * This property tells Temir to wrap or truncate text if its width is larger than container.
   * If `wrap` is passed (by default), Temir will wrap text and split it into multiple lines.
   * If `truncate-*` is passed, Temir will truncate text instead, which will result in one line of text with the rest cut off.
   */
  readonly wrap?: Styles['textWrap']
  readonly children?: any
}

/**
 * This component can display text, and change its style to make it colorful, bold, underline, italic or strikethrough.
 */
export const Text = defineComponent<TextProps>({
  // eslint-disable-next-line vue/no-reserved-component-names
  name: 'Text',
  inheritAttrs: false,
  props: ([
    'color',
    'backgroundColor',
    'dimColor',
    'bold',
    'italic',
    'underline',
    'strikethrough',
    'inverse',
    'wrap',
    'children',
  ] as undefined),
  setup(props, { slots }) {
    const instance = getCurrentInstance()
    const children = slots.default?.()
    if (children === undefined || children === null)
      return null
    const transform = (children: string): string => {
      const { dimColor, color, backgroundColor, bold, italic, underline, strikethrough, inverse } = props
      if (dimColor)
        children = chalk.dim(children)

      if (color)
        children = colorize(children, color, 'foreground')

      if (backgroundColor)
        children = colorize(children, backgroundColor, 'background')

      if (bold)
        children = chalk.bold(children)

      if (italic)
        children = chalk.italic(children)

      if (underline)
        children = chalk.underline(children)

      if (strikethrough)
        children = chalk.strikethrough(children)

      if (inverse)
        children = chalk.inverse(children)

      return children
    }

    return () => {
      const children = slots.default?.()
      return h('temir-text', {
        style: { flexGrow: 0, flexShrink: 1, flexDirection: 'row', textWrap: props.wrap ?? 'wrap' },
        _temir_text: children,
        isInsideText: instance.parent.type.name !== 'Box',
        internal_transform: transform,
      }, children)
    }
  },
})

