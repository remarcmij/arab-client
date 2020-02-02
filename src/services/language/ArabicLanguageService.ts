import LanguageService from './LanguageService';
import store from '../../store';

// eslint-disable-next-line no-misleading-character-class
const tashkeelRegexp = /[\u064c-\u065f\u0640\u0670]/g;

export default class ArabicLanguageService extends LanguageService {
  constructor() {
    super('ar');
  }

  get dir() {
    return 'rtl';
  }

  formatForDisplay(text: string) {
    const { showVocalization } = store.getState().settings;
    return showVocalization ? text : text.replace(tashkeelRegexp, '');
  }

  formatForSearch(text: string): string {
    return text.replace(/[^\u0621-\u064a]/g, '');
  }

  get useEnlargedFont() {
    return true;
  }
}
