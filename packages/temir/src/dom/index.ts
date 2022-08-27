import Yoga from 'yoga-layout-prebuilt'
import type { YogaNode } from 'yoga-layout-prebuilt'
import type { OutputTransformer } from '../render-node-to-output'
import type { Styles } from './styles'
import applyStyles from './styles'
import measureText from './measure-text'
import squashTextNodes from './squash-text-nodes'
import wrapText from './wrap-text'

interface TemirNode {
  parentNode: DOMElement | null
  yogaNode?: YogaNode
  internal_static?: boolean
  style: Styles
}

export const TEXT_NAME = '#text'
export type TextName = '#text'
export type ElementNames =
  | 'temir-root'
  | 'temir-box'
  | 'temir-text'
  | 'temir-virtual-text'
export type DOMNodeAttribute = boolean | string | number
export type NodeNames = ElementNames | TextName

export type TextNode = {
  nodeName: TextName
  nodeValue: string
} & TemirNode

export type DOMNode<T = { nodeName: NodeNames }> = T extends {
  nodeName: infer U
}
  ? U extends '#text' ? TextNode : DOMElement
  : never

export type DOMElement = {
  nodeName: string
  attributes: {
    [key: string]: DOMNodeAttribute
  }
  childNodes: DOMNode[]
  internal_transform?: OutputTransformer

  // Internal properties
  isStaticDirty?: boolean
  staticNode?: any
  onRender?: () => void
  onImmediateRender?: () => void
} & TemirNode

const measureTextNode = function (
  node: DOMElement,
  width: number,
): { width: number; height: number } {
  const text
    = node.nodeName === '#text' ? (node as unknown as TextNode).nodeValue : squashTextNodes(node)

  const dimensions = measureText(text)

  // Text fits into container, no need to wrap
  if (dimensions.width <= width)
    return dimensions

  // This is happening when <TBox> is shrinking child nodes and Yoga asks
  // if we can fit this text node in a <1px space, so we just tell Yoga "no"
  if (dimensions.width >= 1 && width > 0 && width < 1)
    return dimensions

  const textWrap = node.style?.textWrap ?? 'wrap'
  const wrappedText = wrapText(text, width, textWrap)

  return measureText(wrappedText)
}

export const createNode = (nodeName: string): DOMElement => {
  const node: DOMElement = {
    nodeName,
    style: {},
    attributes: {},
    childNodes: [],
    parentNode: null,
    yogaNode: nodeName === 'temir-virtual-text' ? undefined : Yoga.Node.create(),
  }

  if (nodeName === 'temir-text')
    node.yogaNode?.setMeasureFunc(measureTextNode.bind(null, node))

  return node
}

const findClosestYogaNode = (node?: DOMNode): YogaNode | undefined => {
  if (!node || !node.parentNode)
    return undefined

  return node.yogaNode ?? findClosestYogaNode(node.parentNode)
}

export const findRootNode = (node?: DOMElement | TextNode): DOMElement | undefined => {
  if (node.nodeName === 'temir-root')
    return node

  if (!node.parentNode)
    return null
  return findRootNode(node.parentNode)
}

const markNodeAsDirty = (node?: DOMNode): void => {
  // Mark closest Yoga node as dirty to measure text dimensions again
  const yogaNode = findClosestYogaNode(node)
  yogaNode?.markDirty()
}

export const cleanupYogaNode = (node?: Yoga.YogaNode): void => {
  node?.unsetMeasureFunc()
  node?.freeRecursive()
}

export const removeChildNode = (
  node: DOMElement,
  removeNode: DOMNode,
): void => {

  if (removeNode.yogaNode)
    removeNode.parentNode?.yogaNode?.removeChild(removeNode.yogaNode)

  removeNode.parentNode = null

  const index = node.childNodes.indexOf(removeNode)
  if (index >= 0)
    node.childNodes.splice(index, 1)

  if (node.nodeName === 'temir-text' || node.nodeName === 'temir-virtual-text')
    markNodeAsDirty(node)
}

export const appendChildNode = (
  childNode: DOMElement,
  node: DOMElement,
): void => {
  if (
    !childNode
    || (!(childNode as unknown as TextNode).nodeValue && !childNode.yogaNode && childNode.nodeName !== 'temir-virtual-text'))
    return null
  if (childNode.parentNode)
    removeChildNode(childNode.parentNode, childNode)

  childNode.parentNode = node
  node.childNodes.push(childNode)
  if (childNode.yogaNode) {
    node.yogaNode?.insertChild(
      childNode.yogaNode,
      node.yogaNode.getChildCount(),
    )
  }
  const rootNode = findRootNode(node)
  if (node.nodeName === 'temir-text' || node.nodeName === 'temir-virtual-text')
    markNodeAsDirty(node)

  rootNode?.onRender()

}

export const setTextNodeValue = (node: TextNode, text: string): void => {
  if (typeof text !== 'string')
    text = String(text)
  if ((node as unknown as DOMElement).nodeName === 'temir-virtual-text') {
    (node as unknown as DOMElement).childNodes = []
    const textNode: TextNode = {
      nodeName: '#text',
      nodeValue: text,
      yogaNode: undefined,
      parentNode: null,
      style: {},
    }
    appendChildNode(textNode as unknown as DOMElement, (node as unknown as DOMElement))
  }
  else {
    node.nodeValue = text
  }

  const rootNode = findRootNode(node)
  markNodeAsDirty(node)
  rootNode?.onRender()
}

export const createTextNode = (text: string): TextNode => {
  const node: TextNode = {
    nodeName: '#text',
    nodeValue: text,
    yogaNode: undefined,
    parentNode: null,
    style: {},
  }

  setTextNodeValue(node, text)
  return node
}

export const setAttribute = (
  node: DOMElement,
  key: string,
  value: DOMNodeAttribute,
): void => {
  node.attributes[key] = value
}

export const setStyle = (node: DOMNode, style: Styles): void => {
  node.style = style

  if (node.yogaNode)
    applyStyles(node.yogaNode, style)
}

export const updateProps = (node, key, value) => {
  // update Text Component text
  if (key === '_temir_text')
    return

  if (key === 'style')
    setStyle(node, value as Styles)

  else if (key === 'internal_transform')
    node.internal_transform = value as OutputTransformer

  else if (key === 'internal_static')
    node.internal_static = true

  else setAttribute(node, key, value as DOMNodeAttribute)
}
export const createElement = (nodeName: string, _, __, props): DOMElement => {
  const type = nodeName === 'temir-text' && props.isInsideText ? 'temir-virtual-text' : nodeName
  const node = createNode(type)
  for (const key in props)
    updateProps(node, key, props[key])

  return node
}
