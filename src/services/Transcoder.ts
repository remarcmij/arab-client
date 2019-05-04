/* cSpell:disable */
type SubstitutionTuple = [RegExp, string];

type RomanizationStandard = {
  name: string;
  substitutions?: SubstitutionTuple[];
};

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
    name: 'DIN',
  },
  iso: {
    name: 'ISO',
    substitutions: [[/ḫ/g, 'ẖ']],
  },
  ryding: {
    name: 'Ryding',
    substitutions: [
      [/ʾ/g, 'ʼ'],
      [/ḏ/g, 'dh'],
      [/ġ/g, 'gh'],
      [/ṯ/g, 'th'],
      [/ǧ/g, 'j'],
      [/ḥ/g, 'H'],
      [/ḫ/g, 'x'],
      [/ḏ/g, 'dh'],
      [/š/g, 'sh'],
      [/ṣ/g, 'S'],
      [/ḍ/g, 'D'],
      [/ṭ/g, 'T'],
      [/ẓ/g, 'Z'],
      [/ʿ/g, 'ʻ'],
      [/ġ/g, 'gh'],
      [/ā/g, 'aa'],
      [/ī/g, 'ii'],
      [/ū/g, 'uu'],
    ],
  },
  wehr: {
    name: 'Wehr',
    substitutions: [
      [/ġ/g, 'ḡ'],
      [/ǧ/g, 'j'],
      [/ḫ/g, 'ḵ'],
      [/ʾ/g, 'ʼ'],
      [/ʿ/g, 'ʽ'],
    ],
  },
};

const tashkeelRegExp = /[\u064c-\u065f\u0640\u0670]/g;

class Transcoder {
  static applyRomanization(text: string, name: string) {
    const { substitutions } = romanizationStandards[name];
    if (!substitutions) {
      return text;
    }
    return substitutions.reduce(
      (acc, [regex, replaceWith]) => acc.replace(regex, replaceWith),
      text,
    );
  }

  static stripTashkeel(line: string) {
    return line.replace(tashkeelRegExp, '');
  }
}

export default Transcoder;
