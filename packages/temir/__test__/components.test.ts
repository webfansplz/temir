import { describe, expect, it } from 'vitest'
import { ref } from '@vue/runtime-core'
import { createBoxComponent, createTextComponent, renderToString } from '../../.test'

describe('Text Components', () => {
  it('text', () => {
    const output = renderToString(createTextComponent('Hello World'))
    expect(output).toBe('Hello World')
  })

  it('text w/ variable', () => {
    const value = 'World'
    const output = renderToString(createTextComponent(`Hello ${value}`))
    expect(output).toBe('Hello World')
  })

  it('multiple text nodes', () => {
    const output = renderToString(createTextComponent(['Hello ', 'World']))
    expect(output).toBe('Hello World')
  })

  it('text with component', () => {
    const World = createTextComponent('World')
    const output = renderToString(createTextComponent(['Hello ', World]))
    expect(output).toBe('Hello World')
  })

  it('wrap text', () => {
    const text = createTextComponent('Hello World', { wrap: 'wrap' })
    const output = renderToString(createBoxComponent(text, { width: 7 }))
    expect(output).toBe('Hello\nWorld')
  })

  it('don’t wrap text if there is enough space', () => {
    const text = createTextComponent('Hello World', { wrap: 'wrap' })
    const output = renderToString(createBoxComponent(text, { width: 20 }))
    expect(output).toBe('Hello World')
  })

  it('truncate text in the end', () => {
    const text = createTextComponent('Hello World', { wrap: 'truncate' })
    const output = renderToString(createBoxComponent(text, { width: 7 }))
    expect(output).toBe('Hello …')
  })

  it('truncate text in the middle', () => {
    const text = createTextComponent('Hello World', { wrap: 'truncate-middle' })
    const output = renderToString(createBoxComponent(text, { width: 7 }))
    expect(output).toBe('Hel…rld')
  })

  it('truncate text in the beginning', () => {
    const text = createTextComponent('Hello World', { wrap: 'truncate-start' })
    const output = renderToString(createBoxComponent(text, { width: 7 }))
    expect(output).toBe('… World')
  })

  it('ignore empty text node', () => {
    const text = createTextComponent('Hello World')
    const textWrap = createBoxComponent(text)
    const emptyText = createTextComponent('')

    const output = renderToString(createBoxComponent([textWrap, emptyText], { flexDirection: 'column' }))
    expect(output).toBe('Hello World')
  })

  it('render a single empty text node', () => {
    const output = renderToString(createTextComponent(''))
    expect(output).toBe('')
  })

  it('number', () => {
    const output = renderToString(createTextComponent('1'))
    expect(output).toBe('1')
  })

  it('with ref', () => {
    const functional = () => {
      const count = ref('1')
      return createTextComponent(count.value)
    }
    const output = renderToString(functional())
    expect(output).toBe('1')
  })
})
