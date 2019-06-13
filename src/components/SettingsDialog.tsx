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
  WithMobileDialog,
} from '@material-ui/core/withMobileDialog';
import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import {
  setRomanizationSystem,
  setVoiceName,
  toggleTranscription,
  toggleVocalization,
} from '../actions/settings';
import {
  ROMANIZATION_SYSTEM,
  VOICE_NAME,
  NULL_VOICE,
  EDIT_SETTINGS,
  SHOW_VOCALIZATION,
  SHOW_TRANSCRIPTION,
} from '../constants';
import { RootState } from '../reducers';
import SpeechSynthesizer from '../services/SpeechSynthesizer';
import { romanizationStandards } from '../services/Transcoder';

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) =>
  bindActionCreators(
    {
      setRomanizationSystem,
      setVoiceName,
      toggleTranscription,
      toggleVocalization,
    },
    dispatch,
  );

const mapStateToProps = (state: RootState) => ({
  showVocalization: state.settings.showVocalization,
  showTranscription: state.settings.showTranscription,
  romanizationStandard: state.settings.romanizationStandard,
  voiceName: state.settings.voiceName,
});

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      minWidth: 400,
    },
  });

interface OwnProps {
  open: boolean;
  onClose: () => void;
  showVocalization: boolean;
  showTranscription: boolean;
  romanizationStandard: string;
  voiceName: string;
  setRomanizationSystem: (value: string) => void;
  setVoiceName: (value: string) => void;
  toggleVocalization: () => void;
  toggleTranscription: () => void;
}

type Props = OwnProps & WithMobileDialog & WithStyles<typeof styles>;

const SettingsDialog: React.FC<Props> = props => {
  const {
    fullScreen,
    classes,
    onClose,
    open,
    showVocalization,
    showTranscription,
    romanizationStandard,
    voiceName,
  } = props;

  const renderRomanizationSelect = () => (
    <FormControl>
      <InputLabel htmlFor="romanizationStandard-select">
        {ROMANIZATION_SYSTEM}
      </InputLabel>
      <Select
        value={romanizationStandard}
        onChange={event =>
          props.setRomanizationSystem(event.target.value as string)
        }
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
      <InputLabel htmlFor="voice-select">{VOICE_NAME}</InputLabel>
      <Select
        value={voiceName}
        onChange={event => props.setVoiceName(event.target.value as string)}
        inputProps={{
          name: 'voice',
          id: 'voice-select',
        }}
      >
        <MenuItem value="">
          <em>{NULL_VOICE}</em>
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
      <DialogTitle id="responsive-dialog-title">{EDIT_SETTINGS}</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={showVocalization}
                onChange={() => props.toggleVocalization()}
              />
            }
            label={SHOW_VOCALIZATION}
          />
          <FormControlLabel
            control={
              <Switch
                checked={showTranscription}
                onChange={() => props.toggleTranscription()}
              />
            }
            label={SHOW_TRANSCRIPTION}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withMobileDialog<OwnProps>()(withStyles(styles)(SettingsDialog)));
