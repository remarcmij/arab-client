import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ILemma } from 'Types';
import { RootState } from 'typesafe-actions';
import speechSynthesizer from '../../../services/SpeechSynthesizer';

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

const createSequence = (length: number, random = false) => {
  let sequence = [...new Array(length)].map((_, index) => index);
  if (random) {
    sequence = randomize(sequence);
  }
  return sequence;
};

type Props = Readonly<{
  lemmas: ILemma[];
  onUpdate: (lemma: ILemma, index: number, showTranslation: boolean) => void;
}>;

const FlashcardsController: React.FC<Props> = props => {
  const { lemmas, onUpdate } = props;
  const classes = useStyles();
  const { shuffle, foreignVoice, nativeVoice } = useSelector(
    (state: RootState) => state.settings,
  );
  const [index, setIndex] = useState(0);
  const [sequence, setSequence] = useState<number[] | undefined>();
  const [autoPlay, setAutoPlay] = useState(false);

  useEffect(() => {
    setSequence(createSequence(lemmas.length, shuffle));
    setIndex(0);
  }, [lemmas, shuffle, onUpdate]);

  useEffect(() => {
    if (!sequence) {
      return;
    }
    const lemmaIndex = index >> 1;
    const lemma = lemmas[sequence[lemmaIndex]];
    const showTranslation = index % 2 === 1;
    if (showTranslation) {
      if (nativeVoice) {
        speechSynthesizer.speak(nativeVoice, lemma.native);
      }
    } else {
      if (foreignVoice) {
        speechSynthesizer.speak(foreignVoice, lemma.foreign);
      }
    }
    onUpdate(lemma, lemmaIndex, showTranslation);
  }, [lemmas, index, sequence, onUpdate, nativeVoice, foreignVoice]);

  const atLast = () => index === lemmas.length * 2 - 1;
  const atFirst = () => index === 0;

  const onNext = () => {
    setIndex(index + 1);
  };

  const onPrev = () => {
    setIndex(index - 1);
  };

  const onFirst = () => {
    setIndex(0);
  };

  const toLast = () => {
    setIndex((lemmas.length - 1) * 2);
  };

  useEffect(() => {
    const incrementIndex = (val: number) =>
      val < lemmas.length * 2 - 1 ? val + 1 : val;
    if (autoPlay) {
      setIndex(incrementIndex);
      return speechSynthesizer.subscribe(() => {
        setIndex(incrementIndex);
      });
    }
  }, [autoPlay, lemmas]);

  return (
    <Paper className={classes.root} square={true} elevation={1}>
      <IconButton color="primary" onClick={onFirst} disabled={atFirst()}>
        <FirstPageIcon />
      </IconButton>
      <IconButton color="primary" onClick={onPrev} disabled={atFirst()}>
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton color="primary" onClick={() => setAutoPlay(value => !value)}>
        {autoPlay ? <PauseIcon /> : <PlayArrowIcon />}
      </IconButton>
      <IconButton
        color="primary"
        onClick={onNext}
        autoFocus={true}
        disabled={atLast()}
      >
        <NavigateNextIcon />
      </IconButton>
      <IconButton color="primary" onClick={toLast} disabled={atLast()}>
        <LastPageIcon />
      </IconButton>
    </Paper>
  );
};

export default FlashcardsController;
