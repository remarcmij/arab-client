declare module 'Types' {
  export interface Lemma {
    _id: string;
    native: string;
    foreign: string;
    roman?: string;
    filename: string;
    sectionIndex: number;
    title?: string;
    topic: string;
  }

  export interface Topic {
    filename: string;
    publication: string;
    article: string;
    title: string;
    subtitle?: string;
    sections?: string[];
    lemmas?: Lemma[];
  }
}
