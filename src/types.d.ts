declare module 'Types' {
  export interface Lemma {
    base: string
    foreign: string
    trans: string
  }

  interface DocumentBase {
    publication: string
    chapter: string
    title: string
    description: string | null
  }

  export interface MetaDocument extends DocumentBase {
    kind: 'meta'
  }

  export interface LemmaDocument extends DocumentBase {
    kind: 'csv'
    data: Lemma[]
  }

  export interface MarkdownDocument extends DocumentBase {
    kind: 'md'
    data: string
  }

  export type AppDocument = LemmaDocument | MarkdownDocument | MetaDocument
}
