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
