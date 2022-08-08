import { describe, expect, it } from 'vitest'
import { createBoxComponent, createTextComponent, renderToString } from '../../.test'

describe('Flex', () => {
  it('grow equally', () => {
    const A = createBoxComponent(createTextComponent('A'), { flexGrow: 1 })
    const B = createBoxComponent(createTextComponent('B'), { flexGrow: 1 })
    const output = renderToString(createBoxComponent([A, B], { width: 6 }))
    expect(output).toBe('A  B')
  })

  it('grow one element', () => {
    const A = createBoxComponent(createTextComponent('A'), { flexGrow: 1 })
    const B = createTextComponent('B')
    const output = renderToString(createBoxComponent([A, B], { width: 6 }))
    expect(output).toBe('A    B')
  })

  it('dont shrink', () => {
    const A = createBoxComponent(createTextComponent('A'), { flexShrink: 0, width: 6 })
    const B = createBoxComponent(createTextComponent('B'), { flexShrink: 0, width: 6 })
    const C = createBoxComponent(createTextComponent('C'), { width: 6 })
    const output = renderToString(createBoxComponent([A, B, C], { width: 16 }))
    expect(output).toBe('A    B     C')
  })

  it('shrink equally', () => {
    const A = createBoxComponent(createTextComponent('A'), { flexShrink: 0, width: 6 })
    const B = createBoxComponent(createTextComponent('B'), { flexShrink: 0, width: 6 })
    const C = createTextComponent('C')
    const output = renderToString(createBoxComponent([A, B, C], { width: 10 }))
    expect(output).toBe('A    B   C')
  })

  it('set flex basis with flexDirection="row" container', () => {
    const A = createBoxComponent(createTextComponent('A'), { flexBasis: '50%' })
    const B = createTextComponent('B')
    const output = renderToString(createBoxComponent([A, B], { width: 6 }))
    expect(output).toBe('A  B')
  })

  it('set flex basis with flexDirection="column" container', () => {
    const A = createBoxComponent(createTextComponent('A'), { flexBasis: 3 })
    const B = createTextComponent('B')
    const output = renderToString(createBoxComponent([A, B], { height: 6, flexDirection: 'column' }))
    expect(output).toBe('A\n\n\nB\n\n')
  })

  it('set flex basis in percent with flexDirection="column" container', () => {
    const A = createBoxComponent(createTextComponent('A'), { flexBasis: '50%' })
    const B = createTextComponent('B')
    const output = renderToString(createBoxComponent([A, B], { height: 6, flexDirection: 'column' }))
    expect(output).toBe('A\n\n\nB\n\n')
  })
})
