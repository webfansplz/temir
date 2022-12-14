import isFullwidthCodePoint from 'is-fullwidth-code-point'
import ansiStyles from 'ansi-styles'

const astralRegex = /^[\uD800-\uDBFF][\uDC00-\uDFFF]$/
const regex = /\d[^m]*/

const ESCAPES = [
  '\u001B',
  '\u009B',
]

const wrapAnsi = code => `${ESCAPES[0]}[${code}m`

const checkAnsi = (ansiCodes: string[], isEscapes?: boolean, endAnsiCode?: string) => {
  let output = []
  ansiCodes = [...ansiCodes]

  for (let i = 0; i < ansiCodes.length; i++) {
    let ansiCode = ansiCodes[i]
    const ansiCodeOrigin = ansiCode
    if (ansiCode.includes(';'))
      ansiCode = `${ansiCode.split(';')[0][0]}0`

    const item = ansiStyles.codes.get(Number.parseInt(ansiCode, 10));

    if (item) {
      const indexEscape = ansiCodes.indexOf(item.toString())
      if (indexEscape === -1)
        output.push(wrapAnsi(isEscapes ? item : ansiCodeOrigin))

      else
        ansiCodes.splice(indexEscape, 1)
    }
    else if (isEscapes) {
      output.push(wrapAnsi(0))
      break
    }
    else {
      output.push(wrapAnsi(ansiCodeOrigin))
    }
  }

  if (isEscapes) {
    output = output.filter((element, index) => output.indexOf(element) === index)

    if (endAnsiCode !== undefined) {
      const fistEscapeCode = wrapAnsi(ansiStyles.codes.get(Number.parseInt(endAnsiCode, 10)));
      // TODO: Remove the use of `.reduce` here.

      output = output.reduce((current, next) => next === fistEscapeCode ? [next, ...current] : [...current, next], [])
    }
  }

  return output.join('')
}

export default function sliceAnsi(string, begin, end) {
  const characters = [...string]
  const ansiCodes = []

  let stringEnd = typeof end === 'number' ? end : characters.length
  let isInsideEscape = false
  let ansiCode
  let visible = 0
  let output = ''

  for (let index = 0; index < characters.length; index++) {
    const character = characters[index]
    let leftEscape = false

    if (ESCAPES.includes(character)) {
      const code = regex.exec(string.slice(index, index + 18))
      ansiCode = code && code.length > 0 ? code[0] : undefined

      if (visible < stringEnd) {
        isInsideEscape = true

        if (ansiCode !== undefined)
          ansiCodes.push(ansiCode)
      }
    }
    else if (isInsideEscape && character === 'm') {
      isInsideEscape = false
      leftEscape = true
    }

    if (!isInsideEscape && !leftEscape)
      visible++

    if (!astralRegex.test(character) && isFullwidthCodePoint(character.codePointAt())) {
      visible++

      if (typeof end !== 'number')
        stringEnd++
    }

    if (visible > begin && visible <= stringEnd) {
      output += character
    }
    else if (visible === begin && !isInsideEscape && ansiCode !== undefined) {
      output = checkAnsi(ansiCodes)
    }
    else if (visible >= stringEnd) {
      output += checkAnsi(ansiCodes, true, ansiCode)
      break
    }
  }

  return output
}
