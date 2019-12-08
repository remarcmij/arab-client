import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForwardIos';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    button: {
      margin: theme.spacing(1),
      flexGrow: 1,
      maxWidth: 200,
    },
  }),
);

function randomize(indices: number[]) {
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

const nextUpdateArgs = (
  indices: number[],
  index: number,
): [number, boolean] => [indices[index >> 1], index % 2 === 1];

const createSequence = (lemmaCount: number, random = false) => {
  let sequence = [...new Array(lemmaCount)].map((_, index) => index);
  if (random) {
    sequence = randomize(sequence);
  }
  return sequence;
};

type Props = Readonly<{
  lemmaCount: number;
  onUpdate: (index: number, showTranslation: boolean) => void;
}>;

const FlashcardsController: React.FC<Props> = props => {
  const { lemmaCount, onUpdate } = props;
  const classes = useStyles();
  const { shuffle } = useSelector((state: RootState) => state.settings);
  const [index, setIndex] = useState(0);
  const [sequence, setSequence] = useState(createSequence(lemmaCount, shuffle));

  useEffect(() => {
    onUpdate(...nextUpdateArgs(sequence, 0));
  }, [onUpdate, sequence]);

  useEffect(() => {
    setSequence(() => {
      const newSequence = createSequence(lemmaCount, shuffle);
      setIndex(0);
      onUpdate(...nextUpdateArgs(newSequence, 0));
      return newSequence;
    });
  }, [shuffle, lemmaCount, onUpdate]);

  const canGoNext = index < lemmaCount * 2 - 1;
  const canGoPrev = index > 0;

  const onNext = () => {
    setIndex(prevIndex => {
      const newIndex = prevIndex + 1;
      onUpdate(...nextUpdateArgs(sequence, newIndex));
      return newIndex;
    });
  };

  const onPrev = () => {
    setIndex(prevIndex => {
      const newIndex = prevIndex - 1;
      onUpdate(...nextUpdateArgs(sequence, newIndex));
      return newIndex;
    });
  };

  return (
    <Paper className={classes.root} square={true} elevation={1}>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={onPrev}
        disabled={!canGoPrev}
      >
        <ArrowBackIcon />
      </Button>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={onNext}
        autoFocus={true}
        disabled={!canGoNext}
      >
        <ArrowForwardIcon />
      </Button>
    </Paper>
  );
};

export default FlashcardsController;
