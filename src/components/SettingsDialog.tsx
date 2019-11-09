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
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  setRomanizationSystem,
  setVoiceName,
  toggleTranscription,
  toggleVocalization,
} from '../actions/settings';
import { RootState } from '../reducers';
import SpeechSynthesizer from '../services/SpeechSynthesizer';
import { romanizationStandards } from '../services/Transcoder';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    paper: {
      minWidth: 400,
    },
  }),
);

interface IProps {
  open: boolean;
  onClose: () => void;
}

const SettingsDialog: React.FC<IProps> = props => {
  const dispatch = useDispatch();
  const {
    showVocalization,
    showTranscription,
    romanizationStandard,
    voiceName,
  } = useSelector((state: RootState) => state.settings);
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { onClose, open } = props;

  const renderRomanizationSelect = () => (
    <FormControl>
      <InputLabel htmlFor="romanizationStandard-select">
        {t('transcription_system')}
      </InputLabel>
      <Select
        value={romanizationStandard}
        onChange={event =>
          dispatch(setRomanizationSystem(event.target.value as string))
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
      <InputLabel htmlFor="voice-select">{t('voice_name')}</InputLabel>
      <Select
        value={voiceName}
        onChange={event => dispatch(setVoiceName(event.target.value as string))}
        inputProps={{
          name: 'voice',
          id: 'voice-select',
        }}
      >
        <MenuItem value="">
          <em>{t('no_voice')}</em>
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
      <DialogTitle id="responsive-dialog-title">
        {t('change_settings')}
      </DialogTitle>
      <DialogContent>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={showVocalization}
                onChange={() => dispatch(toggleVocalization())}
              />
            }
            label={t('show_vocalization')}
          />
          <FormControlLabel
            control={
              <Switch
                checked={showTranscription}
                onChange={() => dispatch(toggleTranscription())}
              />
            }
            label={t('show_transcription')}
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

export default SettingsDialog;
