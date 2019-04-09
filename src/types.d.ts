declare module 'Types' {
  export interface DictEntry {
    base: string;
    foreign: string;
    word_class: string | null;
    notes: string | null;
    doc_id: number;
  }

  export interface Lemma {
    base: string;
    foreign: string;
    trans?: string;
  }

  interface DocumentBase {
    filename: string;
    title: string;
    prolog: string;
    epilog: string;
    subtitle: string | null;
  }

  export interface MetaDocument extends DocumentBase {
    kind: 'meta';
  }

  export interface LemmaDocument extends DocumentBase {
    kind: 'wordlist';
    body: Lemma[];
  }

  export interface MarkdownDocument extends DocumentBase {
    kind: 'text';
    body: string;
  }

  export type AppDocument = LemmaDocument | MarkdownDocument | MetaDocument;
}
