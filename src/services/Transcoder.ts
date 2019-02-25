/* cSpell:disable */
import LRU from 'lru-cache'
import { string } from 'prop-types'

type SubstitutionTuple = [RegExp, string]

type RomanizationStandard = {
  name: string
  substitutions?: SubstitutionTuple[]
}

// See: https://en.wikipedia.org/wiki/Romanization_of_Arabic
// Note: source files are encoded with the DIN romanizationStandard standard
export const romanizationStandards: { [key: string]: RomanizationStandard } = {
  ala_lc: {
    name: 'ALA-LC',
    substitutions: [
      [/ḏ/g, 'dh'],
      [/ġ/g, 'gh'],
      [/ǧ/g, 'j'],
      [/ḫ/g, 'kh'],
      [/š/g, 'sh'],
      [/ṯ/g, 'th'],
      [/ʾ/g, 'ʼ'],
      [/ʿ/g, 'ʻ'],
    ],
  },
  de_moor: {
    name: 'de Moor/van Pel',
    substitutions: [[/ʾ/g, 'ʼ'], [/ʿ/g, 'ع'], [/ḫ/g, 'ẖ'], [/ǧ/g, 'j']],
  },
  din: {
    name: 'DIN 31635',
  },
}

const CHARCODE_SUPERSCRIPT_ALIF = 1648
const CHARCODE_TATWEEL = 1600

const tashkeelCache = new LRU<string, string>(500)

class Transcoder {
  static applyRomanization(text: string, name: string) {
    const { substitutions } = romanizationStandards[name]
    if (!substitutions) {
      return text
    }
    return substitutions.reduce(
      (acc, [regex, replaceWith]) => acc.replace(regex, replaceWith),
      text,
    )
  }

  static isCharTashkeel(letter: string) {
    const code = letter.charCodeAt(0)
    // 1648 - superscript alif
    // 1619 - madd: ~
    return (
      code === CHARCODE_TATWEEL ||
      code === CHARCODE_SUPERSCRIPT_ALIF ||
      (code >= 0x64c && code <= 0x65f)
    )
  }

  static stripTashkeel(input: string) {
    let output = tashkeelCache.get(input)
    if (!output) {
      output = ''
      for (const letter of input) {
        if (!this.isCharTashkeel(letter)) {
          output += letter
        }
      }
      tashkeelCache.set(input, output)
    }
    return output
  }
}

export default Transcoder
