import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { toggleShuffle, toggleRepeat, toggleSpeech } from '../actions';
import { RootState } from 'typesafe-actions';

type Props = Readonly<{ open: boolean; onClose: () => void }>;

const FlashcardOptionsDialog: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const {
    settings: { nativeVoice, foreignVoice },
    flashcards: { shuffle, repeat, speech },
  } = useSelector((state: RootState) => state);

  const speechAvailable = !!(nativeVoice && foreignVoice);

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Flashcard Options</DialogTitle>
      <Box display="flex" flexDirection="column" px={4} pb={2}>
        <FormControlLabel
          control={
            <Switch
              disabled={!speechAvailable}
              checked={speech}
              onChange={() => dispatch(toggleSpeech())}
            />
          }
          label="Enable speech"
        />
        <FormControlLabel
          control={
            <Switch
              checked={shuffle}
              onChange={() => dispatch(toggleShuffle())}
            />
          }
          label="Shuffle flashcards"
        />
        <FormControlLabel
          control={
            <Switch
              checked={repeat}
              onChange={() => dispatch(toggleRepeat())}
            />
          }
          label="Repeat continuously"
        />
      </Box>
    </Dialog>
  );
};

export default FlashcardOptionsDialog;
