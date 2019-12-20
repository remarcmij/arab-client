import ArabicLanguageService from './ArabicLanguageService';
import DutchLanguageService from './DutchLanguageService';
import IndonesianLanguageService from './IndonesianLanguageService';
import { ILanguageService } from './LanguageService';

const languageServices: { [lang: string]: ILanguageService } = {
  ar: new ArabicLanguageService(),
  nl: new DutchLanguageService(),
  id: new IndonesianLanguageService(),
};

export function getLanguageService(lang: string): ILanguageService {
  if (!(lang in languageServices)) {
    throw new Error(`Unsupported language: ${lang}`);
  }
  return languageServices[lang];
}
