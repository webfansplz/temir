import { describe, expect, it } from 'vitest'
import type { Options } from 'boxen'
import boxen from 'boxen'
import { createBoxComponent, createTextComponent, renderToString } from '../../.test'

const box = (text: string, options?: Options): string => {
  return boxen(text, {
    ...options,
    borderStyle: 'round',
  })
}

describe('Borders', () => {
  it('single node - full width box', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Hello World'), { width: 50, borderStyle: 'round' }))
    expect(output).toBe(box('Hello World'.padEnd(48, ' ')))
  })

  it('single node - full width box with colorful border', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Hello World'), { width: 50, borderStyle: 'round', borderColor: 'green' }))
    expect(output).toBe(box('Hello World'.padEnd(48, ' '), { borderColor: 'green' }))
  })

  it('single node - fit-content box', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Hello World'), { width: 50, borderStyle: 'round', alignSelf: 'flex-start' }))
    expect(output).toBe(box('Hello World'.padEnd(48, ' ')))
  })

  it('single node - fit-content box with wide characters', () => {
    const output = renderToString(createBoxComponent(createTextComponent('こんにちは'), { borderStyle: 'round', alignSelf: 'flex-start' }))
    expect(output).toBe(box('こんにちは'))
  })

  it('single node - fit-content box with emojis', () => {
    const output = renderToString(createBoxComponent(createTextComponent('🌊🌊'), { borderStyle: 'round', alignSelf: 'flex-start' }))
    expect(output).toBe(box('🌊🌊'))
  })

  it('single node - fixed width box', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Hello World'), { width: 20, borderStyle: 'round' }))
    expect(output).toBe(box('Hello World'.padEnd(18, ' ')))
  })

  it('single node - fixed width and height box', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Hello World'), { width: 20, height: 20, borderStyle: 'round' }))
    expect(output).toBe(box('Hello World'.padEnd(18, ' ') + '\n'.repeat(17)))
  })

  it('single node - box with padding', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Hello World'), { alignSelf: 'flex-start', padding: 1, borderStyle: 'round' }))
    expect(output).toBe(box('\n Hello World \n'))
  })

  it('single node - box with horizontal alignment', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Hello World'), { width: 20, justifyContent: 'center', borderStyle: 'round' }))
    expect(output).toBe(box('   Hello World    '))
  })

  it('single node - box with vertical alignment', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Hello World'), { height: 20, alignItems: 'center', alignSelf: 'flex-start', borderStyle: 'round' }))
    expect(output).toBe(box(`${'\n'.repeat(8)}Hello World${'\n'.repeat(9)}`))
  })

  it('single node - box with wrapping', () => {
    const output = renderToString(createBoxComponent(createTextComponent('Hello World'), { width: 10, borderStyle: 'round' }))
    expect(output).toBe(box('Hello   \nWorld'))
  })
})
