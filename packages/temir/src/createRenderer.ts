// @ts-nocheck

import { createRenderer } from '@vue/runtime-core'
import type { DOMElement, DOMNode } from './dom'
import { appendChildNode, createElement, createTextNode, findRootNode, setTextNodeValue, updateProps } from './dom'
import type { Styles } from './dom/styles'

global.__VUE_OPTIONS_API__ = true
global.__VUE_PROD_DEVTOOLS__ = true

interface Props {
  [key: string]: unknown
}

const renderder = createRenderer<DOMNode, DOMElement>({
  createElement,
  createText(text) {
    return createTextNode(text)
  },
  createComment() { },
  insert: appendChildNode,
  patchProp(el, key, oldProps, newProps) {
    el[key] = newProps
    updateProps(el, key, newProps)
    findRootNode(el)?.onRender()
  },
  setText: setTextNodeValue,
  remove(el) { },
  parentNode() { },
  nextSibling() { },
})

export default renderder
