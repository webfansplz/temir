import chalk from 'chalk'
import { defineComponent, h, ref, watchEffect } from 'vue'
import { useInput } from '../composables'
import { TText } from './'

export interface TTextInputProps {
  /**
   * Text to display when `value` is empty.
   */
  placeholder?: string

  /**
   * Listen to user's input. Useful in case there are multiple input components
   * at the same time and input must be "routed" to a specific component.
   */
  focus?: boolean

  /**
   * Replace all chars and mask the value. Useful for password inputs.
   */
  mask?: string

  /**
   * Whether to show cursor and allow navigation inside text input with arrow keys.
   */
  showCursor?: boolean

  /**
   * Highlight pasted text
   */
  highlightPastedText?: boolean

  /**
   * Value to display in a text input.
   */
  value: string

  /**
   * Function to call when value updates.
   */
  onChange: (value: string) => void

  /**
   * Function to call when `Enter` is pressed, where first argument is a value of the input.
   */
  onSubmit?: (value: string) => void
}

export const TTextInput = defineComponent<TTextInputProps>({
  name: 'TextInput',
  props: ([
    'value',
    'placeholder',
    'focus',
    'mask',
    'highlightPastedText',
    'showCursor',
    'onChange',
    'onSubmit',
  ] as undefined),
  setup(props) {
    const cursorOffset = ref((props.value || '').length)
    const cursorWidth = ref(0)

    watchEffect(() => {
      if (!props.focus || !props.showCursor)
        return
      const n = props.value || ''
      if (cursorOffset.value > n.length - 1) {
        cursorOffset.value = n.length
        cursorWidth.value = 0
      }
    })

    const cursorActualWidth = props.highlightPastedText ? cursorWidth.value : 0

    const oValue = props.mask ? props.mask.repeat(props.value.length) : props.value
    let renderedValue = oValue
    let renderedPlaceholder = props.placeholder ? chalk.grey(props.placeholder) : undefined

    // Fake mouse cursor, because it's too inconvenient to deal with actual cursor and ansi escapes
    if (props.showCursor && props.focus) {
      renderedPlaceholder
        = props.placeholder.length > 0
          ? chalk.inverse(props.placeholder[0]) + chalk.grey(props.placeholder.slice(1))
          : chalk.inverse(' ')

      renderedValue = oValue.length > 0 ? '' : chalk.inverse(' ')

      let i = 0

      for (const char of oValue) {
        if (i >= cursorOffset.value - cursorActualWidth && i <= cursorOffset.value)
          renderedValue += chalk.inverse(char)

        else
          renderedValue += char

        i++
      }

      if (oValue.length > 0 && cursorOffset.value === oValue.length)
        renderedValue += chalk.inverse(' ')
    }

    useInput(
      (input, key) => {
        if (
          key.upArrow
          || key.downArrow
          || (key.ctrl && input === 'c')
          || key.tab
          || (key.shift && key.tab)
        )
          return

        if (key.return) {
          if (props.onSubmit)
            props.onSubmit(props.value)

          return
        }

        let nextCursorOffset = cursorOffset.value
        let nextValue = props.value
        let nextCursorWidth = 0

        if (key.leftArrow) {
          if (props.showCursor)
            nextCursorOffset--
        }
        else if (key.rightArrow) {
          if (props.showCursor)
            nextCursorOffset++
        }
        else if (key.backspace || key.delete) {
          if (cursorOffset.value > 0) {
            nextValue
              = props.value.slice(0, cursorOffset.value - 1)
              + props.value.slice(cursorOffset.value, props.value.length)

            nextCursorOffset--
          }
        }
        else {
          nextValue
            = props.value.slice(0, cursorOffset.value)
            + input
            + props.value.slice(cursorOffset.value, props.value.length)

          nextCursorOffset += input.length

          if (input.length > 1)
            nextCursorWidth = input.length
        }

        if (cursorOffset.value < 0)
          nextCursorOffset = 0

        if (cursorOffset.value > props.value.length)
          nextCursorOffset = props.value.length

        cursorOffset.value = nextCursorOffset
        cursorWidth.value = nextCursorWidth

        if (nextValue !== props.value)
          props.onChange(nextValue)
      },
      { isActive: props.focus },
    )

    return () => {
      const content = props.placeholder
        ? props.value.length > 0
          ? renderedValue
          : renderedPlaceholder
        : renderedValue
      return h(TText, null, content)
    }
  },
})

