import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useTheme } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { ITopic } from 'Types';
import { RootState } from 'typesafe-actions';
import speechSynthesizer from '../../../services/SpeechSynthesizer';
import {
  closeSettings,
  IVoiceInfo,
  setPreferredVoices,
  setTargetLang,
  toggleVocalization,
} from '../actions';
import FieldSet from './FieldSet';
import LanguageSelect from './LanguageSelect';
import VoiceSelect from './VoiceSelect';

type LanguagePropName = 'foreignLang' | 'nativeLang';

const uniqueLanguages = (topics: ITopic[], propName: LanguagePropName) =>
  Array.from(new Set(topics.map(topic => topic[propName])));

const SettingsDialog: React.FC = () => {
  const { settingsOpen } = useSelector((state: RootState) => state.settings);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { targetLang, preferredVoices, showVocalization } = useSelector(
    (state: RootState) => state.settings,
  );

  const { publications: topics } = useSelector(
    (state: RootState) => state.content,
  );

  const { pathname } = useLocation();
  const onMainScreen = () => pathname === '/content';

  const foreignLangs = useMemo(() => uniqueLanguages(topics, 'foreignLang'), [
    topics,
  ]);

  const { nativeLang } = topics[0];

  const foreignVoices = speechSynthesizer.getVoices(targetLang!);

  const foreignVoice = preferredVoices
    .concat(foreignVoices)
    .find(voice => voice.lang.startsWith(targetLang!));

  const nativeVoices = speechSynthesizer.getVoices(nativeLang);

  const nativeVoice = preferredVoices
    .concat(nativeVoices)
    .find(voice => voice.lang.startsWith(nativeLang));

  const setVoice = (lang: string) => (voice: IVoiceInfo) => {
    const voices = preferredVoices
      .filter(v => !v.lang.startsWith(lang))
      .concat({ name: voice.name, lang: voice.lang });
    dispatch(setPreferredVoices(voices));
  };

  const handleLangChange = (lang: string) => {
    dispatch(setTargetLang(lang));
  };

  const handleVocalizationChange = () => {
    dispatch(toggleVocalization());
  };

  const handleClose = () => {
    dispatch(closeSettings());
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={settingsOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {t('change_settings')}
      </DialogTitle>
      <DialogContent>
        <FieldSet label="Target Language">
          <LanguageSelect
            languages={foreignLangs}
            language={targetLang!}
            onChange={handleLangChange}
            disabled={!onMainScreen()}
          />
        </FieldSet>
        <FieldSet label="Preferred Voices">
          <VoiceSelect
            label={t(targetLang!)}
            voices={foreignVoices}
            selectedVoice={foreignVoice}
            setSelectedVoice={setVoice(targetLang!)}
          />
          <VoiceSelect
            label={t(nativeLang)}
            voices={nativeVoices}
            selectedVoice={nativeVoice}
            setSelectedVoice={setVoice(nativeLang)}
          />
        </FieldSet>
        {targetLang === 'ar' && (
          <FieldSet label="Arabic Vocalization">
            <FormControlLabel
              control={
                <Switch
                  checked={showVocalization}
                  onChange={handleVocalizationChange}
                />
              }
              label={t('show_vocalization')}
            />
          </FieldSet>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SettingsDialog;
