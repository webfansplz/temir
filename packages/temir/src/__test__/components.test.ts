import { describe, expect, it } from 'vitest'
import type { Component, VNode } from '@vue/runtime-core'
import { defineComponent, h, ref } from '@vue/runtime-core'
import type { TBoxProps, TTextProps } from '../components'
import { TBox, TText } from '../components'
import { createStdout, renderToString } from '../../../.test'

function createTextComponent(text: string | Component, options: TTextProps = {}) {
  return h(TText, options, text as string)
}

function createBoxComponent(content: VNode | VNode[], options: TBoxProps = {}) {
  return h(TBox, options, content)
}

describe('Text Components', () => {
  it('text', async () => {
    const output = renderToString(createTextComponent('Hello World'))
    expect(output).toBe('Hello World')
  })

  it('text w/ variable', async () => {
    const value = 'World'
    const output = renderToString(createTextComponent(`Hello ${value}`))
    expect(output).toBe('Hello World')
  })

  it('multiple text nodes', async () => {
    const output = renderToString(createTextComponent(['Hello ', 'World']))
    expect(output).toBe('Hello World')
  })

  it('text with component', async () => {
    const World = createTextComponent('World')
    const output = renderToString(createTextComponent(['Hello ', World]))
    expect(output).toBe('Hello World')
  })

  it('wrap text', async () => {
    const text = createTextComponent('Hello World', { wrap: 'wrap' })
    const output = renderToString(createBoxComponent(text, { width: 7 }))
    expect(output).toBe('Hello\nWorld')
  })

  it('don’t wrap text if there is enough space', async () => {
    const text = createTextComponent('Hello World', { wrap: 'wrap' })
    const output = renderToString(createBoxComponent(text, { width: 20 }))
    expect(output).toBe('Hello World')
  })

  it('truncate text in the end', async () => {
    const text = createTextComponent('Hello World', { wrap: 'truncate' })
    const output = renderToString(createBoxComponent(text, { width: 7 }))
    expect(output).toBe('Hello …')
  })

  it('truncate text in the middle', async () => {
    const text = createTextComponent('Hello World', { wrap: 'truncate-middle' })
    const output = renderToString(createBoxComponent(text, { width: 7 }))
    expect(output).toBe('Hel…rld')
  })

  it('truncate text in the beginning', async () => {
    const text = createTextComponent('Hello World', { wrap: 'truncate-start' })
    const output = renderToString(createBoxComponent(text, { width: 7 }))
    expect(output).toBe('… World')
  })

  it('ignore empty text node', async () => {
    const text = createTextComponent('Hello World')
    const textWrap = createBoxComponent(text)
    const emptyText = createTextComponent('')

    const output = renderToString(createBoxComponent([textWrap, emptyText], { flexDirection: 'column' }))
    expect(output).toBe('Hello World')
  })

  it('render a single empty text node', async () => {
    const output = renderToString(createTextComponent(''))
    expect(output).toBe('')
  })

  it('number', async () => {
    const output = renderToString(createTextComponent('1'))
    expect(output).toBe('1')
  })

  it('with ref', async () => {
    const functional = () => {
      const count = ref('1')
      return createTextComponent(count.value)
    }
    const output = renderToString(functional())
    expect(output).toBe('1')
  })
})
