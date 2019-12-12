import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { ILemma } from 'Types';

function randomize<T>(items: T[]) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

const createSequence = (lemmas: ILemma[], random = false) => {
  let sequence = [...lemmas];
  if (random) {
    sequence = randomize(sequence);
  }
  return sequence;
};

const useSequence = (lemmas: ILemma[], shuffle: boolean) => {
  const [sequence, setSequence] = useState<ILemma[] | undefined>();

  useEffect(() => {
    setSequence(createSequence(lemmas, shuffle));
  }, [lemmas, shuffle]);

  return sequence;
};

export default useSequence;
