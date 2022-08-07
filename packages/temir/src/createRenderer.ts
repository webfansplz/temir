// @ts-nocheck

import { createRenderer } from '@vue/runtime-core'
import type { DOMElement, DOMNode } from './dom'
import { appendChildNode, cleanupYogaNode, createElement, createTextNode, findRootNode, removeChildNode, setTextNodeValue, updateProps } from './dom'

global.__VUE_OPTIONS_API__ = true
global.__VUE_PROD_DEVTOOLS__ = true

const renderder = createRenderer<DOMNode, DOMElement>({
  createElement,
  createText(text) {
    return createTextNode(text)
  },
  insert: appendChildNode,
  patchProp(el, key, oldProps, newProps) {
    if (!key.startsWith('_temir_'))
      el[key] = newProps
    updateProps(el, key, newProps)
    findRootNode(el)?.onRender()
  },
  setText: setTextNodeValue,
  setElementText: setTextNodeValue,
  createComment() {
    return null
  },
  remove(el) {
    if (!el)
      return
    el.parentNode && removeChildNode(el.parentNode, el)
    el.yogaNode && cleanupYogaNode(el.yogaNode)
  },
  parentNode() { },
  nextSibling() { },
})

export default renderder
