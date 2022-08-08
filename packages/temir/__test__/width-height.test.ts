import { describe, expect, it } from 'vitest'
import { createBoxComponent, createTextComponent, renderToString } from '../../.test'

describe('Width-Height', () => {
  it('set width', () => {
    const A = createBoxComponent(createTextComponent('A'), { width: 5 })
    const output = renderToString(createBoxComponent([A, createTextComponent('B')]))
    expect(output).toBe('A    B')
  })

  it('set width in percent', () => {
    const A = createBoxComponent(createTextComponent('A'), { width: '50%' })
    const output = renderToString(createBoxComponent([A, createTextComponent('B')], { width: 10 }))
    expect(output).toBe('A    B')
  })

  it('set min width', () => {
    const A = createBoxComponent(createTextComponent('A'), { minWidth: 5 })
    const output = renderToString(createBoxComponent([A, createTextComponent('B')]))
    expect(output).toBe('A    B')
  })

  it('set min width', () => {
    const C = createBoxComponent(createTextComponent('AAAAA'), { minWidth: 2 })
    const largerOutput = renderToString(createBoxComponent([C, createTextComponent('B')]))
    expect(largerOutput).toBe('AAAAAB')
  })

  it('set height', () => {
    const output = renderToString(createBoxComponent([createTextComponent('A'), createTextComponent('B')], { height: 4 }))
    expect(output).toBe('AB\n\n\n')
  })

  it('set height in percent', () => {
    const A = createBoxComponent(createTextComponent('A'), { height: '50%' })
    const output = renderToString(createBoxComponent([A, createTextComponent('B')], { height: 6, flexDirection: 'column' }))
    expect(output).toBe('A\n\n\nB\n\n')
  })

  it('cut text over the set height', () => {
    const output = renderToString(createBoxComponent(createTextComponent('AAAABBBBCCCC'), { height: 2, textWrap: 'wrap' }), { columns: 4 })
    expect(output).toBe('AAAA\nBBBB')
  })

  it('set min width', () => {
    const output = renderToString(createBoxComponent(createTextComponent('A'), { minHeight: 4 }))
    expect(output).toBe('A\n\n\n')
  })

  it('set min width', () => {
    const output = renderToString(createBoxComponent(createBoxComponent(createTextComponent('A'), { height: 4 }), { minHeight: 2 }))
    expect(output).toBe('A\n\n\n')
  })
})
