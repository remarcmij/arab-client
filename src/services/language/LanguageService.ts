import store from '../../store';
import speechSynthesizer from '../SpeechSynthesizer';

export interface ILanguageService {
  dir: string;
  formatForDisplay(text: string): string;
  formatForSearch(text: string): string;
  useEnlargedFont: boolean;
  speak(text: string): void;
}

type Idiom = {
  substitutions: Array<[RegExp, string]>;
  ignores: RegExp[];
};
export default abstract class LanguageService implements ILanguageService {
  constructor(public readonly lang: string) {}

  get dir() {
    return 'ltr';
  }

  formatForDisplay(text: string): string {
    return text;
  }

  formatForSearch(text: string): string {
    return text;
  }

  speak(text: string) {
    let filteredText = text;
    const { filters } = store.getState().content;
    const langFilters = filters?.[this.lang];
    if (langFilters) {
      filteredText = langFilters.substitutions.reduce(
        (acc, [regexp, subst]) => acc.replace(regexp, subst),
        filteredText,
      );
      filteredText = langFilters.ignores.reduce(
        (acc, regexp) => acc.replace(regexp, ''),
        filteredText,
      );
    }
    speechSynthesizer.speakWithVoice(this.voiceInfo!.name, filteredText);
  }

  private get voiceInfo() {
    const { preferredVoices } = store.getState().settings;
    let voice = preferredVoices.find(v => v.lang.startsWith(this.lang));
    if (voice == null) {
      voice = speechSynthesizer
        .getVoices()
        .find(v => v.lang.startsWith(this.lang));
    }
    return voice;
  }

  get useEnlargedFont() {
    return false;
  }
}
