import { describe, expect, it } from 'vitest'
import { createBoxComponent, createTextComponent, renderToString } from '../../.test'

describe('Padding', () => {
  it('padding', () => {
    const output = renderToString(createBoxComponent(createTextComponent('X'), { padding: 2 }))
    expect(output).toBe('\n\n  X\n\n')
  })

  it('padding X', () => {
    const output = renderToString(createBoxComponent([createBoxComponent(createTextComponent('X'), { paddingX: 2 }), createTextComponent('Y')]))
    expect(output).toBe('  X  Y')
  })

  it('padding Y', () => {
    const output = renderToString(createBoxComponent(createTextComponent('X'), { paddingY: 2 }))
    expect(output).toBe('\n\nX\n\n')
  })

  it('padding top', () => {
    const output = renderToString(createBoxComponent(createTextComponent('X'), { paddingTop: 2 }))
    expect(output).toBe('\n\nX')
  })

  it('padding bottom', () => {
    const output = renderToString(createBoxComponent(createTextComponent('X'), { paddingBottom: 2 }))
    expect(output).toBe('X\n\n')
  })

  it('padding left', () => {
    const output = renderToString(createBoxComponent(createTextComponent('X'), { paddingLeft: 2 }))
    expect(output).toBe('  X')
  })

  it('padding right', () => {
    const output = renderToString(createBoxComponent([createBoxComponent(createTextComponent('X'), { paddingRight: 2 }), createTextComponent('Y')]))

    expect(output).toBe('X  Y')
  })

  it('nested padding', () => {
    const output = renderToString(createBoxComponent(createBoxComponent(createTextComponent('X'), { padding: 2 }), { padding: 2 }))

    expect(output).toBe('\n\n\n\n    X\n\n\n\n')
  })

  it('padding with multiline string', () => {
    const output = renderToString(createBoxComponent(createTextComponent('A\nB'), { padding: 2 }))

    expect(output).toBe('\n\n  A\n  B\n\n')
  })

  it('apply padding to text with newlines', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Hello\nWorld'), { padding: 1 }))

    expect(output).toBe('\n Hello\n World\n')
  })

  it('apply padding to wrapped text', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Hello World'), { padding: 1, width: 5 }))

    expect(output).toBe('\n Hel\n lo\n Wor\n ld\n')
  })
})
