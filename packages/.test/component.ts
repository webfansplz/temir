import type { Component, VNode } from '@vue/runtime-core'
import { h } from '@vue/runtime-core'
import { TBox, TText } from '../temir/src/components'
import type { TBoxProps, TTextProps } from '../temir/src/components'


export function createTextComponent(text: string | Component, options: TTextProps = {}) {
  return h(TText, options, text as string)
}

export function createBoxComponent(content: VNode | VNode[], options: TBoxProps = {}) {
  return h(TBox, options, content)
}
