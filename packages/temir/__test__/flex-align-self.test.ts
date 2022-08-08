import { describe, expect, it } from 'vitest'
import { createBoxComponent, createTextComponent, renderToString } from '../../.test'

describe('Flex Align Self', () => {
  it('row - align text to center', () => {
    const output = renderToString(createBoxComponent(createBoxComponent(createTextComponent('Test'), { alignSelf: 'center' }), { height: 3 }))
    expect(output).toBe('\nTest\n')
  })

  it('row - align multiple text nodes to center', () => {
    const output = renderToString(createBoxComponent(createBoxComponent([createTextComponent('A'), createTextComponent('B')], { alignSelf: 'center' }), { height: 3 }))
    expect(output).toBe('\nAB\n')
  })

  it('row - align text to bottom', () => {
    const output = renderToString(createBoxComponent(createBoxComponent(createTextComponent('Test'), { alignSelf: 'flex-end' }), { height: 3 }))
    expect(output).toBe('\n\nTest')
  })

  it('row - align multiple text nodes to bottom', () => {
    const output = renderToString(createBoxComponent(createBoxComponent([createTextComponent('A'), createTextComponent('B')], { alignSelf: 'flex-end' }), { height: 3 }))
    expect(output).toBe('\n\nAB')
  })

  it('column - align text to center', () => {
    const output = renderToString(createBoxComponent(createBoxComponent(createTextComponent('Test'), { alignSelf: 'center' }), { width: 10, flexDirection: 'column' }))
    expect(output).toBe('   Test')
  })

  it('column - align text to right', () => {
    const output = renderToString(createBoxComponent(createBoxComponent(createTextComponent('Test'), { alignSelf: 'flex-end' }), { width: 10, flexDirection: 'column' }))
    expect(output).toBe('      Test')
  })
})
