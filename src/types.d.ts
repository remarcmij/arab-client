declare module 'Types' {
  export interface Lemma {
    _id: string;
    source: string;
    target: string;
    roman?: string;
    filename: string;
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

  export type AppDocument = LemmaDocument | MarkdownDocument | IndexDocument;
}
