declare module 'Types' {
  export interface DictEntry {
    base: string;
    foreign: string;
    word_class: string | null;
    notes: string | null;
    doc_id: number;
  }

  export interface Lemma {
    id: number;
    source: string;
    target: string;
    roman?: string;
    filename: string;
    doc_id: number;
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
