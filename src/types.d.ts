interface Lemma {
  base: string;
  foreign: string;
  trans: string;
}

interface Publication {
  publication: string;
  chapter: string;
  title: string;
  description: string | null;
}

interface IWordList extends Publication {
  data: Lemma[];
}
