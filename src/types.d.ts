declare module 'Types' {
  export interface Lemma {
    base: string
    foreign: string
    trans?: string
  }

  interface DocumentBase {
    publication: string
    article: string
    title: string
    prolog: string
    epilog: string
    subtitle: string | null
  }

  export interface MetaDocument extends DocumentBase {
    kind: 'meta'
  }

  export interface LemmaDocument extends DocumentBase {
    kind: 'table'
    body: Lemma[]
  }

  export interface MarkdownDocument extends DocumentBase {
    kind: 'md'
    body: string
  }

  export type AppDocument = LemmaDocument | MarkdownDocument | MetaDocument
}
