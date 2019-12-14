import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
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
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import LanguageContext from '../../../contexts/LanguageContext';
import SpeechSynthesizer from '../../../services/SpeechSynthesizer';
import { romanizationStandards } from '../../../services/Transcoder';
import {
  closeSettings,
  setForeignVoice,
  setNativeVoice,
  setRomanizationSystem,
  toggleTranscription,
  toggleVocalization,
} from '../actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      minWidth: 400,
      margin: theme.spacing(2),
    },
    mt2: {
      marginTop: theme.spacing(2),
    },
  }),
);

const FieldSet: React.FC<{ label: string }> = props => (
  <FormControl component="fieldset" fullWidth={true} style={{ marginTop: 16 }}>
    <FormLabel component="legend">{props.label}</FormLabel>
    {props.children}
  </FormControl>
);

const SettingsDialog: React.FC = () => {
  const dispatch = useDispatch();
  const {
    settingsOpen,
    showVocalization,
    showTranscription,
    romanizationStandard,
    foreignVoice,
    nativeVoice,
  } = useSelector((state: RootState) => state.settings);
  const language = useContext(LanguageContext);

  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const onClose = () => dispatch(closeSettings());

  const renderRomanizationSelect = () => (
    <FormControl component="fieldset">
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

  const renderVoiceSelect = (lang: string) => {
    const isForeign = lang === language.foreign;
    return (
      <FormControl classes={{ root: classes.mt2 }}>
        <InputLabel htmlFor="voice-select">{t(lang)}</InputLabel>
        <Select
          value={isForeign ? foreignVoice : nativeVoice}
          onChange={event => {
            const voiceName = event.target.value as string;
            const action = isForeign ? setForeignVoice : setNativeVoice;
            dispatch(action(voiceName));
          }}
          inputProps={{
            name: 'voice',
            id: 'voice-select',
          }}
        >
          <MenuItem value="">
            <em>{t('no_voice')}</em>
          </MenuItem>
          {SpeechSynthesizer.getVoices()
            .filter(voice => voice.lang.startsWith(`${lang}-`))
            .map(voice => (
              <MenuItem key={voice.voiceURI} value={voice.name}>
                {`${voice.name} (${voice.lang})`}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={settingsOpen}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      classes={{ paper: classes.paper }}
    >
      <DialogTitle id="responsive-dialog-title">
        {t('change_settings')}
      </DialogTitle>
      <DialogContent>
        <FieldSet label="Vocalization">
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
          </FormGroup>
        </FieldSet>
        <FieldSet label="Transcription">
          <FormGroup>
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
          </FormGroup>
        </FieldSet>
        <FieldSet label={t('select_voices')}>
          <FormGroup>{renderVoiceSelect(language.foreign)}</FormGroup>
          <FormGroup>{renderVoiceSelect(language.native)}</FormGroup>
        </FieldSet>
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
