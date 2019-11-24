import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Types from 'Types';
import Flashcard from './Flashcard';
import FlashcardButtonBar from './FlashcardButtonBar';
import FlashcardHeader from './FlashcardHeader';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      // To fix IE11 flex min-height bug
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

type Props = Readonly<{
  topic: Types.ITopic;
  sectionIndex: number;
  showVocalization: boolean;
  voiceName: string;
}>;

const LemmaFlashcards: React.FC<Props> = props => {
  const classes = useStyles();
  const { topic, sectionIndex, showVocalization, voiceName } = props;
  const { lemmas: allLemmas = [] } = topic;

  let lemmas = allLemmas;
  if (sectionIndex !== 0) {
    const indexNum = sectionIndex - 1;
    lemmas = lemmas.filter(lemma => lemma.sectionIndex === indexNum);
  }

  const [index, setIndex] = useState<number>(0);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);

  const handleNext = () => {
    if (!showTranslation) {
      setShowTranslation(true);
    } else if (index < lemmas.length - 1) {
      setIndex(index + 1);
      setShowTranslation(false);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
    setShowTranslation(false);
  };

  return (
    <div className={classes.root}>
      <FlashcardHeader topic={topic} index={index} length={lemmas.length} />
      {lemmas.length !== 0 && (
        <Flashcard
          lemma={lemmas[index]}
          showTranslation={showTranslation}
          showVocalization={showVocalization}
          voiceName={voiceName}
        />
      )}
      <FlashcardButtonBar onNext={handleNext} onPrev={handlePrev} />
    </div>
  );
};

export default LemmaFlashcards;
