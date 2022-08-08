import { describe, expect, it } from 'vitest'
import { createBoxComponent, createTextComponent, renderToString } from '../../.test'

describe('Flex Justify Content', () => {
  it('row - align text to center', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Test'), { justifyContent: 'center', width: 10 }))
    expect(output).toBe('   Test')
  })

  it('row - align multiple text nodes to center', () => {
    const output = renderToString(createBoxComponent([createTextComponent('A'), createTextComponent('B')], { justifyContent: 'center', width: 10 }))
    expect(output).toBe('    AB')
  })

  it('row - align text to right', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Test'), { justifyContent: 'flex-end', width: 10 }))
    expect(output).toBe('      Test')
  })

  it('row - align multiple text nodes to right', () => {
    const output = renderToString(createBoxComponent([createTextComponent('A'), createTextComponent('B')], { justifyContent: 'flex-end', width: 10 }))
    expect(output).toBe('        AB')
  })

  it('row - align two text nodes on the edges', () => {
    const output = renderToString(createBoxComponent([createTextComponent('A'), createTextComponent('B')], { justifyContent: 'space-between', width: 4 }))
    expect(output).toBe('A  B')
  })

  it('column - align text to center', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Test'), { flexDirection: 'column', justifyContent: 'center', height: 3 }))
    expect(output).toBe('\nTest\n')
  })

  it('column - align text to bottom', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Test'), { flexDirection: 'column', justifyContent: 'flex-end', height: 3 }))
    expect(output).toBe('\n\nTest')
  })

  it('column - align two text nodes on the edges', () => {
    const output = renderToString(createBoxComponent([createTextComponent('A'), createTextComponent('B')], { flexDirection: 'column', justifyContent: 'space-between', height: 4 }))
    expect(output).toBe('A\n\n\nB')
  })
})
