import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ILemma } from 'Types';
import { RootState } from 'typesafe-actions';
import FlashcardTimer from '../../../../services/FlashcardTimer';
import speechSynthesizer from '../../../../services/SpeechSynthesizer';
import { toggleShuffle } from '../../../settings/actions';
import useLemmas from './hooks/useLemmas';

const flashcardTimer = new FlashcardTimer();

const incrementIndex = (lemmas: ILemma[]) => (val: number) =>
  Math.min(lemmas.length * 2 - 1, val + 1);

type Props = Readonly<{
  lemmas: ILemma[];
  onUpdate: (lemma: ILemma, index: number, showTranslation: boolean) => void;
}>;

const FlashcardsController: React.FC<Props> = props => {
  const { lemmas, onUpdate } = props;
  const dispatch = useDispatch();
  const { shuffle, foreignVoice, nativeVoice } = useSelector(
    (state: RootState) => state.settings,
  );
  const [autoPlay, setAutoPlay] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);

  const [index, setIndex] = useLemmas(
    lemmas,
    shuffle,
    (lemma, index, showTranslation) => {
      onUpdate(lemma, index, showTranslation);
      if (nativeVoice && foreignVoice && speechEnabled) {
        if (showTranslation) {
          nativeVoice && speechSynthesizer.speak(nativeVoice, lemma.native);
        } else {
          foreignVoice && speechSynthesizer.speak(foreignVoice, lemma.foreign);
        }
      }
    },
  );

  useEffect(() => {
    if (!autoPlay) {
      return;
    }
    setIndex(incrementIndex(lemmas));
    const player =
      nativeVoice && foreignVoice && speechEnabled
        ? speechSynthesizer
        : flashcardTimer;
    return player.subscribe(() => {
      setIndex(incrementIndex(lemmas));
    });
  }, [autoPlay, lemmas, nativeVoice, foreignVoice, speechEnabled, setIndex]);

  const atFirst = () => index === 0;
  const atLast = () => index === lemmas.length * 2 - 1;
  const toFirst = () => setIndex(0);
  const toLast = () => setIndex((lemmas.length - 1) * 2);
  const onNext = () => setIndex(index + 1);
  const onPrev = () => setIndex(index - 1);

  return (
    <Box m={1}>
      <Paper>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          px={2}
        >
          <Box>
            <FormControlLabel
              control={
                <Switch
                  checked={shuffle}
                  onChange={() => dispatch(toggleShuffle())}
                />
              }
              label="Shuffle"
            />
            {nativeVoice && foreignVoice ? (
              <FormControlLabel
                control={
                  <Switch
                    checked={speechEnabled}
                    onChange={() => setSpeechEnabled(!speechEnabled)}
                  />
                }
                label="Speech"
              />
            ) : (
              <div></div>
            )}
          </Box>
          <Box flexDirection="column">
            <IconButton color="primary" onClick={toFirst} disabled={atFirst()}>
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
        </Box>
      </Paper>
    </Box>
  );
};

export default FlashcardsController;
