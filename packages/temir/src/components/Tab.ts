import readline from 'readline'
import type { Component, VNode } from '@vue/runtime-core'
import { Fragment, computed, defineComponent, h, onMounted, onUnmounted, ref } from '@vue/runtime-core'
import type { StdinProps } from '../composables'
import { useStdin } from '../composables'
import type { TBoxProps } from '.'
import { TBox, TText } from '.'

export interface TTabProps {
  name: string
}

/**
 * Declare how does the keyboard interacts with ink-tab here
 */
interface KeyMapProps {
  useNumbers?: boolean
  useTab?: boolean
  previous?: string[]
  next?: string[]
}

/**
 * A <Tab> component
 */
const TTab = defineComponent({
  setup(_, { slots }) {
    return () => (h(Fragment, slots.default()))
  },
})

/**
 * Props for the <Tabs> component
 */
export interface TTabsProps {
  /**
   * A function called whenever a tab is changing.
   * @param {string} name the name of the tab passed in the `name` prop
   * @param {React.Component<TTabProps>} activeTab the current active tab component
   */
  onChange?: (name: string, activeTab: Component<typeof TTab>) => void
  children?: Component<typeof TTab>[]
  flexDirection?: TBoxProps['flexDirection']
  width?: TBoxProps['width']
  keyMap?: KeyMapProps
  isFocused?: boolean
  defaultValue?: string
  showIndex?: boolean
  separator?: string
}

interface RequiredKeyMapProps {
  useNumbers: boolean
  useTab: boolean
  previous: string[]
  next: string[]
}

interface TabsWithStdinProps extends TTabsProps {
  isRawModeSupported: boolean
  setRawMode: StdinProps['setRawMode']
  stdin: StdinProps['stdin']
}

const TabsWithStdin = defineComponent<TabsWithStdinProps>({
  name: 'TabsWithStdin',
  props: ([
    'stdin',
    'isRawModeSupported',
    'setRawMode',
    'onChange',
    'children',
    'width',
    'flexDirection',
    'keyMap',
    'isFocused',
    'defaultValue',
    'showIndex',
  ] as undefined),
  setup(props, { slots }) {
    const activeTab = ref(0)
    const children = slots.default()

    const isColumn = computed(() => (props.flexDirection === 'column' || props.flexDirection === 'column-reverse'))
    const normalizedSeparator = computed(() => {
      const separatorWidth = props.width || 6
      return props.separator ?? (isColumn.value
        ? new Array(separatorWidth).fill('─').join('')
        : ' | ')
    })

    const defaultKeyMap: RequiredKeyMapProps = {
      useNumbers: true,
      useTab: true,
      previous: [isColumn.value ? 'up' : 'left'],
      next: [isColumn.value ? 'down' : 'right'],
    }

    function onTabChange(id: number) {
      const { onChange } = props

      activeTab.value = id
      onChange(id)
    }

    function moveToNextTab() {
      const nextTabid = activeTab.value + 1
      onTabChange(nextTabid > children.length - 1 ? 0 : nextTabid)
    }

    function moveToPreviousTab() {
      const prevTabid = activeTab.value - 1
      onTabChange(prevTabid < 0 ? children.length - 1 : prevTabid)
    }

    function onKeyPress(ch: string,
      key: null | { name: string; shift: boolean; meta: boolean }) {
      const { keyMap, isFocused } = props

      if (!key || isFocused === false)
        return

      const currentKeyMap = { ...defaultKeyMap, ...keyMap }
      const { useNumbers, useTab, previous, next } = currentKeyMap

      if (previous.includes(key.name))
        moveToPreviousTab()

      if (next.includes(key.name))
        moveToNextTab()

      switch (key.name) {
        case 'tab': {
          if (!useTab || isFocused !== null) {
            // if isFocused != null, then the focus is managed by ink and thus we can not use this key
            return
          }

          if (key.shift === true)
            moveToPreviousTab()

          else
            moveToNextTab()

          break
        }

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9': {
          if (!useNumbers)
            return

          if (key.meta === true) {
            const tabId = key.name === '0' ? 9 : parseInt(key.name, 10) - 1

            onTabChange(tabId)
            console.log('???!!!')
          }

          break
        }

        default:
          break
      }
    }

    onMounted(() => {
      const {
        stdin,
        setRawMode,
        isRawModeSupported,
        defaultValue,
      } = props

      if (isRawModeSupported && stdin) {
        // use temir / node `setRawMode` to read key-by-key
        if (setRawMode)
          setRawMode(true)

        readline.emitKeypressEvents(stdin)
        stdin.on('keypress', onKeyPress.bind(this))
      }

      // select defaultValue if it's valid otherwise select the first tab on component mount
      const initialTabIndex = defaultValue
        ? children?.findIndex(
          child => child.props.name === defaultValue,
        )
        : 0

      onTabChange(initialTabIndex)
    })

    onUnmounted(() => {
      const { stdin, setRawMode, isRawModeSupported } = props

      if (isRawModeSupported && stdin) {
        if (setRawMode)
          setRawMode(false) // remove set raw mode, as it might interfere with CTRL-C

        stdin.removeListener('keypress', onKeyPress.bind(this))
      }
    })

    function normalizeChild(children: VNode[]) {
      return children.map((item, key) => {
        const { name } = item.props
        const colors = {
          backgroundColor: activeTab.value === key ? (props.isFocused !== false ? 'green' : 'gray') : undefined,
          color: activeTab.value === key ? 'black' : undefined,
        } as const

        const content = [
          key > 0
          && h(TText, {
            color: 'gray',
          }, normalizedSeparator.value),
          h(TBox, {
            key: name,
            flexDirection: props.flexDirection,
          }, [
            props.showIndex && h(TText, {
              color: 'grey',
            }, key + 1),
            h(TText, colors, item),
          ].filter(Boolean)),
        ].filter(Boolean)
        return content
      })
    }

    return () => {
      const children = slots.default()

      return h(TBox, {
        flexDirection: props.flexDirection,
        width: props.width,
      }, normalizeChild(children))
    }
  },
})

/**
 * The <Tabs> component
 */
const TTabs = defineComponent<TTabsProps>({
  name: 'TTabs',
  props: ([
    'onChange',
    'flexDirection',
    'width',
    'keyMap',
    'isFocused',
    'defaultValue',
    'showIndex',
  ] as undefined),
  setup(props, { slots }) {
    const { isRawModeSupported, stdin, setRawMode } = useStdin()
    return () => {
      const children = slots.default()
      return h(TabsWithStdin, {
        isRawModeSupported,
        stdin,
        setRawMode,
        ...props,
      }, children)
    }
  },
})

export { TTabs, TTab }
