declare module 'Types' {
  export interface ILemma {
    _id: string;
    native: string;
    nativeLang: string;
    foreign: string;
    foreignLang: string;
    roman?: string;
    filename: string;
    sectionIndex: number;
    title?: string;
    topic: string;
  }

  interface IStringFilters {
    [lang: string]: {
      substitutions: Array<[string, string]>;
      ignores: string[];
    };
  }

  export interface ITopic {
    _id: string;
    filename: string;
    publication: string;
    article: string;
    title: string;
    subtitle?: string;
    foreignLang: string;
    nativeLang: string;
    filters?: IStringFilters;
    sections?: string[];
    lemmas?: ILemma[];
  }
}
