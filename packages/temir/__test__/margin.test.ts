import { describe, expect, it } from 'vitest'
import { createBoxComponent, createTextComponent, renderToString } from '../../.test'

describe('Margin', () => {
  it('margin', () => {
    const output = renderToString(createBoxComponent(createTextComponent('X'), { margin: 2 }))
    expect(output).toBe('\n\n  X\n\n')
  })

  it('margin X', () => {
    const output = renderToString(createBoxComponent([createBoxComponent(createTextComponent('X'), { marginX: 2 }), createTextComponent('Y')]))
    expect(output).toBe('  X  Y')
  })

  it('margin Y', () => {
    const output = renderToString(createBoxComponent(createTextComponent('X'), { marginY: 2 }))
    expect(output).toBe('\n\nX\n\n')
  })

  it('margin top', () => {
    const output = renderToString(createBoxComponent(createTextComponent('X'), { marginTop: 2 }))
    expect(output).toBe('\n\nX')
  })

  it('margin bottom', () => {
    const output = renderToString(createBoxComponent(createTextComponent('X'), { marginBottom: 2 }))
    expect(output).toBe('X\n\n')
  })

  it('margin left', () => {
    const output = renderToString(createBoxComponent(createTextComponent('X'), { marginLeft: 2 }))
    expect(output).toBe('  X')
  })

  it('margin right', () => {
    const output = renderToString(createBoxComponent([createBoxComponent(createTextComponent('X'), { marginRight: 2 }), createTextComponent('Y')]))

    expect(output).toBe('X  Y')
  })

  it('nested margin', () => {
    const output = renderToString(createBoxComponent(createBoxComponent(createTextComponent('X'), { margin: 2 }), { margin: 2 }))

    expect(output).toBe('\n\n\n\n    X\n\n\n\n')
  })

  it('margin with multiline string', () => {
    const output = renderToString(createBoxComponent(createTextComponent('A\nB'), { margin: 2 }))

    expect(output).toBe('\n\n  A\n  B\n\n')
  })

  it('apply margin to text with newlines', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Hello\nWorld'), { margin: 1 }))

    expect(output).toBe('\n Hello\n World\n')
  })

  it('apply margin to wrapped text', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Hello World'), { margin: 1, width: 6 }))

    expect(output).toBe('\n Hello\n World\n')
  })
})
