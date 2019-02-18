interface ILemma {
  base: string;
  foreign: string;
  trans: string;
}

interface IPublication {
  publication: string;
  chapter: string;
  title: string;
  description: string | null;
}

interface IWordList extends IPublication {
  data: ILemma[];
}
