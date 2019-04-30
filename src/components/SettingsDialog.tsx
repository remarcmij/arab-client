import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from '@material-ui/core/InputLabel';
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
import SpeechSynthesizer from '../services/SpeechSynthesizer';
import { romanizationStandards } from '../services/Transcoder';
import { useSettingsContext } from '../contexts/settings';
import {
  setRomanizationSystem,
  setVoiceName,
  toggleVocalization,
  toggleTranscription,
} from '../contexts/settings/actions';
import * as S from './strings';

const styles = (theme: Theme) =>
  createStyles({
    paper: {
      minWidth: 400,
    },
    divider: {
      marginTop: theme.spacing.unit * 3,
      marginBottom: theme.spacing.unit * 3,
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
        {S.ROMANIZATION_SYSTEM}
      </InputLabel>
      <Select
        native={true}
        value={romanizationStandard}
        onChange={event => dispatch(setRomanizationSystem(event.target.value))}
        inputProps={{
          name: 'Romanization',
          id: 'romanizationStandard-select',
        }}
      >
        {Object.entries(romanizationStandards).map(([key, value]) => (
          <option key={key} value={key}>
            {value.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );

  const renderVoiceSelect = () => (
    <FormControl>
      <InputLabel htmlFor="romanizationStandard-select">
        {S.VOICE_NAME}
      </InputLabel>
      <Select
        native={true}
        value={voiceName}
        onChange={event => dispatch(setVoiceName(event.target.value))}
        inputProps={{
          name: 'Romanization',
          id: 'romanizationStandard-select',
        }}
      >
        <option value="none">{S.NULL_VOICE}</option>
        {SpeechSynthesizer.getVoices()
          .filter(voice => voice.lang.startsWith('ar-'))
          .map(voice => (
            <option key={voice.voiceURI} value={voice.name}>
              {`${voice.name} (${voice.lang})`}
            </option>
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
      <DialogTitle id="responsive-dialog-title">{S.EDIT_SETTINGS}</DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={showVocalization}
                onChange={() => dispatch(toggleVocalization())}
              />
            }
            label={S.SHOW_VOCALIZATION}
          />
          <FormControlLabel
            control={
              <Switch
                checked={showTranscription}
                onChange={() => dispatch(toggleTranscription())}
              />
            }
            label={S.SHOW_TRANSCRIPTION}
          />
          {renderRomanizationSelect()}
          <Divider className={classes.divider} />
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
