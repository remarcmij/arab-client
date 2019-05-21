declare module 'Types' {
  export interface Lemma {
    _id: string;
    nl: string;
    ar: string;
    rom?: string;
    filename: string;
    sectionNum: number;
    title?: string;
  }

  interface DocumentBase {
    filename: string;
    title: string;
    prolog: string;
    epilog: string;
    subtitle: string | null;
  }

  export interface IndexDocument extends DocumentBase {
    kind: 'index';
  }

  export interface LemmaDocument extends DocumentBase {
    kind: 'lemmas';
    body: Lemma[];
  }

  export interface MarkdownDocument extends DocumentBase {
    kind: 'text';
    body: string;
  }

  export interface AppDocument {
    filename: string;
    title: string;
    subtitle: string | null;
    kind: string;
    sections: string[];
    lemmas: Lemma[];
  }
}
