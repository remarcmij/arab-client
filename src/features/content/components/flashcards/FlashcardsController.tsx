import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ILemma } from 'Types';
import { RootState } from 'typesafe-actions';
import FlashcardTimer from '../../../../services/FlashcardTimer';
import speechSynthesizer from '../../../../services/SpeechSynthesizer';
import FlashcardOptionsDialog from './FlashcardOptionsDialog';
import useSequence from './hooks/useSequence';

const flashcardTimer = new FlashcardTimer();

const incrementIndex = (lemmas: ILemma[]) => (val: number) =>
  Math.min(lemmas.length * 2 - 1, val + 1);

type Props = Readonly<{
  lemmas: ILemma[];
  onUpdate: (lemma: ILemma, index: number, showTranslation: boolean) => void;
}>;

const FlashcardsController: React.FC<Props> = props => {
  const { lemmas, onUpdate } = props;
  const { shuffle, foreignVoice, nativeVoice, speech } = useSelector(
    (state: RootState) => state.settings,
  );
  const [index, setIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [optionDialogOpen, setOptionsDialogOpen] = useState(false);

  // Create a new sequence (in lemma order or shuffled) whenever
  // the list of lemmas changes or the shuffle status changes.
  const sequence = useSequence(lemmas, shuffle);

  // Reset index to zero on sequence changes
  useEffect(() => setIndex(0), [sequence]);

  useEffect(() => {
    if (!sequence) return;
    const trueIndex = index >> 1;
    const lemma = sequence[trueIndex];
    const showTranslation = index % 2 === 1;
    onUpdate(lemma, trueIndex, showTranslation);
    if (nativeVoice && foreignVoice && speech) {
      if (showTranslation) {
        if (nativeVoice) speechSynthesizer.speak(nativeVoice, lemma.native);
      } else {
        if (foreignVoice) speechSynthesizer.speak(foreignVoice, lemma.foreign);
      }
    }
  }, [index, sequence, onUpdate, speech, nativeVoice, foreignVoice]);

  useEffect(() => {
    if (!autoPlay) return;
    setIndex(incrementIndex(lemmas));
    const player =
      nativeVoice && foreignVoice && speech
        ? speechSynthesizer
        : flashcardTimer;
    return player.subscribe(() => setIndex(incrementIndex(lemmas)));
  }, [autoPlay, lemmas, nativeVoice, foreignVoice, speech, setIndex]);

  const atFirst = () => index === 0;
  const atLast = () => index === lemmas.length * 2 - 1;
  const toFirst = () => setIndex(0);
  const toLast = () => setIndex((lemmas.length - 1) * 2);
  const onNext = () => setIndex(index + 1);
  const onPrev = () => setIndex(index - 1);

  return (
    <Box m={1}>
      <Paper>
        <Grid container>
          <Grid item xs={1} md={1} />
          <Grid item xs={9} md={10}>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="center"
              alignItems="center"
              px={2}
            >
              <IconButton
                color="primary"
                onClick={toFirst}
                disabled={atFirst()}
              >
                <FirstPageIcon fontSize="large" />
              </IconButton>
              <IconButton color="primary" onClick={onPrev} disabled={atFirst()}>
                <NavigateBeforeIcon fontSize="large" />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => setAutoPlay(value => !value)}
              >
                {autoPlay ? (
                  <PauseIcon fontSize="large" />
                ) : (
                  <PlayArrowIcon fontSize="large" />
                )}
              </IconButton>
              <IconButton
                color="primary"
                onClick={onNext}
                autoFocus={true}
                disabled={atLast()}
              >
                <NavigateNextIcon fontSize="large" />
              </IconButton>
              <IconButton color="primary" onClick={toLast} disabled={atLast()}>
                <LastPageIcon fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={2} md={1}>
            <IconButton onClick={() => setOptionsDialogOpen(true)}>
              <MoreVertIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
      <FlashcardOptionsDialog
        onClose={() => setOptionsDialogOpen(false)}
        open={optionDialogOpen}
      />
    </Box>
  );
};

export default FlashcardsController;
