/* cSpell:disable */
type RomanizationSubstitution = [RegExp, string]

const iso = null
const deMoor: RomanizationSubstitution[] = [[/ʿ/g, 'ع'], [/ʾ/g, 'ʼ'], [/ḫ/g, 'ẖ'], [/ǧ/g, 'j']]

export type RomanizationSystems = {
  iso: null
  deMoor: RomanizationSubstitution[]
}

const romanizationSystems = {
  iso,
  deMoor,
}

const CHARCODE_SUPERSCRIPT_ALIF = 1648
const CHARCODE_TATWEEL = 1600

class Transcoder {
  static applyRomanization(text: string, standardName: keyof RomanizationSystems) {
    if (standardName === 'iso') {
      return text
    }
    const substitutions = romanizationSystems[standardName]
    return substitutions.reduce((acc, [regex, replaceWith]) => {
      return acc.replace(regex, replaceWith)
    }, text)
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
    let output = ''
    for (const letter of input) {
      if (!this.isCharTashkeel(letter)) {
        output += letter
      }
    }
    return output
  }
}

export default Transcoder
