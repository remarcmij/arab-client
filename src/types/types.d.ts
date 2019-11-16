declare module 'Types' {
  export interface ILemma {
    _id: string;
    native: string;
    foreign: string;
    roman?: string;
    filename: string;
    sectionIndex: number;
    title?: string;
    topic: string;
  }

  export interface ITopic {
    _id: string;
    filename: string;
    publication: string;
    article: string;
    title: string;
    subtitle?: string;
    sections?: string[];
    lemmas?: ILemma[];
  }
}
