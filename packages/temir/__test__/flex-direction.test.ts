import { describe, expect, it } from 'vitest'
import { createBoxComponent, createTextComponent, renderToString } from '../../.test'

describe('Flex Direction', () => {
  it('direction row', () => {
    const output = renderToString(createBoxComponent([createTextComponent('A'), createTextComponent('B')], { flexDirection: 'row' }))
    expect(output).toBe('AB')
  })

  it('direction row reverse', () => {
    const output = renderToString(createBoxComponent([createTextComponent('A'), createTextComponent('B')], { flexDirection: 'row-reverse', width: 4 }))
    expect(output).toBe('  BA')
  })

  it('direction column', () => {
    const output = renderToString(createBoxComponent([createTextComponent('A'), createTextComponent('B')], { flexDirection: 'column' }))
    expect(output).toBe('A\nB')
  })

  it('direction column reverse', () => {
    const output = renderToString(createBoxComponent([createTextComponent('A'), createTextComponent('B')], { flexDirection: 'column-reverse', height: 4 }))
    expect(output).toBe('\n\nB\nA')
  })

  it('don’t squash text nodes when column direction is applied', () => {
    const output = renderToString(createBoxComponent([createTextComponent('A'), createTextComponent('B')], { flexDirection: 'column' }))
    expect(output).toBe('A\nB')
  })
})
