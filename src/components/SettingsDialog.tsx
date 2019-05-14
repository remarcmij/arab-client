import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import withMobileDialog, {
  InjectedProps,
} from '@material-ui/core/withMobileDialog';
import React from 'react';
import { useSettingsContext } from '../contexts/settings';
import {
  setRomanizationSystem,
  setVoiceName,
  toggleTranscription,
  toggleVocalization,
} from '../contexts/settings/actions';
import SpeechSynthesizer from '../services/SpeechSynthesizer';
import { romanizationStandards } from '../services/Transcoder';
import * as C from './constants';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      minWidth: 400,
    },
  });

interface OwnProps {
  open: boolean;
  onClose: () => void;
}

type Props = OwnProps & InjectedProps & WithStyles<typeof styles>;

const SettingsDialog: React.FC<Props> = props => {
  const { fullScreen, classes, onClose, open } = props;

  const { settings, dispatch } = useSettingsContext();

  const {
    showVocalization,
    showTranscription,
    romanizationStandard,
    voiceName,
  } = settings;

  const renderRomanizationSelect = () => (
    <FormControl>
      <InputLabel htmlFor="romanizationStandard-select">
        {C.ROMANIZATION_SYSTEM}
      </InputLabel>
      <Select
        value={romanizationStandard}
        onChange={event => dispatch(setRomanizationSystem(event.target.value))}
        inputProps={{
          name: 'romanization',
          id: 'romanizationStandard-select',
        }}
      >
        {Object.entries(romanizationStandards).map(([key, value]) => (
          <MenuItem key={key} value={key}>
            {value.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const renderVoiceSelect = () => (
    <FormControl>
      <InputLabel htmlFor="voice-select">{C.VOICE_NAME}</InputLabel>
      <Select
        value={voiceName}
        onChange={event => dispatch(setVoiceName(event.target.value))}
        inputProps={{
          name: 'voice',
          id: 'voice-select',
        }}
      >
        <MenuItem value="">
          <em>{C.NULL_VOICE}</em>
        </MenuItem>
        {SpeechSynthesizer.getVoices()
          .filter(voice => voice.lang.startsWith('ar-'))
          .map(voice => (
            <MenuItem key={voice.voiceURI} value={voice.name}>
              {`${voice.name} (${voice.lang})`}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      classes={{ paper: classes.paper }}
    >
      <DialogTitle id="responsive-dialog-title">{C.EDIT_SETTINGS}</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={showVocalization}
                onChange={() => dispatch(toggleVocalization())}
              />
            }
            label={C.SHOW_VOCALIZATION}
          />
          <FormControlLabel
            control={
              <Switch
                checked={showTranscription}
                onChange={() => dispatch(toggleTranscription())}
              />
            }
            label={C.SHOW_TRANSCRIPTION}
          />
          {renderRomanizationSelect()}
          {renderVoiceSelect()}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" autoFocus={true}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withMobileDialog<OwnProps>()(withStyles(styles)(SettingsDialog));
