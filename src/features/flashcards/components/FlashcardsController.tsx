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
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ILemma } from 'Types';
import { RootState } from 'typesafe-actions';
import FlashcardTimer from '../../../services/FlashcardTimer';
import { getLanguageService } from '../../../services/language';
import speechSynthesizer from '../../../services/SpeechSynthesizer';
import useSequence from '../hooks/useSequence';
import FlashcardOptionsDialog from './FlashcardOptionsDialog';

const flashcardTimer = new FlashcardTimer();

type Props = Readonly<{
  lemmas: ILemma[];
  onUpdate: (lemma: ILemma, index: number, showTranslation: boolean) => void;
}>;

const FlashcardsController: React.FC<Props> = props => {
  const { lemmas, onUpdate } = props;
  const {
    flashcards: { shuffle, speech, repeat },
    content: { article },
  } = useSelector((state: RootState) => state);
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
    const foreignLS = getLanguageService(lemma.foreignLang);
    const nativeLS = getLanguageService(lemma.nativeLang);
    if (speech) {
      if (showTranslation) {
        nativeLS.speak(lemma.native);
      } else {
        foreignLS.speak(lemma.foreign);
      }
    }
  }, [index, sequence, onUpdate, speech, article]);

  const incrementIndex = useCallback(
    (val: number) => {
      // Check if end of sequence reached
      if (val >= lemmas.length * 2 - 1) {
        // If repeat is enabled, start at index zero again
        if (repeat) {
          return 0;
        }
        // Otherwise force auto play to stop
        setAutoPlay(false);
      }
      return val + 1;
    },
    [lemmas, repeat],
  );

  useEffect(() => {
    if (!autoPlay) return;
    setIndex(incrementIndex);
    const player = speech ? speechSynthesizer : flashcardTimer;
    return player.subscribe(() => setIndex(incrementIndex));
  }, [autoPlay, lemmas, speech, setIndex, incrementIndex]);

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
