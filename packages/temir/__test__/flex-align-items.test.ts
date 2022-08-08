import { describe, expect, it } from 'vitest'
import { createBoxComponent, createTextComponent, renderToString } from '../../.test'

describe('Flex Align Items', () => {
  it('row - align text to center', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Test'), { alignItems: 'center', height: 3 }))
    expect(output).toBe('\nTest\n')
  })

  it('row - align multiple text nodes to center', () => {
    const output = renderToString(createBoxComponent([createTextComponent('A'), createTextComponent('B')], { alignItems: 'center', height: 3 }))
    expect(output).toBe('\nAB\n')
  })

  it('row - align text to bottom', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Test'), { alignItems: 'flex-end', height: 3 }))
    expect(output).toBe('\n\nTest')
  })

  it('row - align multiple text nodes to bottom', () => {
    const output = renderToString(createBoxComponent([createTextComponent('A'), createTextComponent('B')], { alignItems: 'flex-end', height: 3 }))
    expect(output).toBe('\n\nAB')
  })

  it('column - align text to center', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Test'), { flexDirection: 'column', alignItems: 'center', width: 10 }))
    expect(output).toBe('   Test')
  })

  it('column - align text to right', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Test'), { flexDirection: 'column', alignItems: 'flex-end', width: 10 }))
    expect(output).toBe('      Test')
  })
})
