declare module 'Types' {
  export interface Lemma {
    base: string
    foreign: string
    trans: string
  }

  export interface Document {
    publication: string
    chapter: string
    title: string
    description: string | null
  }

  export interface LemmaDocument extends Document {
    data: Lemma[]
  }
}
