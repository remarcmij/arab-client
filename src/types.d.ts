declare module 'Types' {
  export interface Lemma {
    _id: string;
    nl: string;
    ar: string;
    rom?: string;
    filename: string;
    sectionNum: number;
    title?: string;
    topic: string;
  }

  interface DocumentBase {
    filename: string;
    title: string;
    prolog: string;
    epilog: string;
    subtitle: string | null;
  }

  export interface AppDocument {
    filename: string;
    title: string;
    subtitle: string | null;
    sections: string[];
    lemmas: Lemma[];
  }
}
