import { describe, expect, it } from 'vitest'
import { createBoxComponent, createTextComponent, renderToString } from '../../.test'

describe('Display', () => {
  it('display flex', () => {
    const output = renderToString(createBoxComponent(createTextComponent('X'), { display: 'flex' }))
    expect(output).toBe('X')
  })

  it('display none', () => {
    const output = renderToString(createBoxComponent([createBoxComponent(createTextComponent('Kitty!'), { display: 'none' }), createTextComponent('Doggo')], { flexDirection: 'column' }))
    expect(output).toBe('Doggo')
  })
})
