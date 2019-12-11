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

type OnUpdateCallback = (
  lemma: ILemma,
  index: number,
  showTranslation: boolean,
) => void;

const useLemmas = (
  lemmas: ILemma[],
  shuffle: boolean,
  callback: OnUpdateCallback,
): [number, Dispatch<SetStateAction<number>>] => {
  const [index, setIndex] = useState(0);

  const [sequence, setSequence] = useState<ILemma[] | undefined>();

  // Create a new sequence and reset the index to zero.
  useEffect(() => {
    setSequence(createSequence(lemmas, shuffle));
    setIndex(0);
  }, [lemmas, shuffle]);

  // Update consumer with new lemma
  useEffect(() => {
    if (!sequence) {
      return;
    }
    const trueIndex = index >> 1;
    const lemma = sequence[trueIndex];
    const showTranslation = index % 2 === 1;
    callback(lemma, trueIndex, showTranslation);
  }, [index, sequence, callback]);

  return [index, setIndex];
};

export default useLemmas;
