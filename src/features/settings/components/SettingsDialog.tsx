import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import {
  closeSettings,
  toggleVocalization,
  setTargetLang,
  loadVoicesAsync,
  IVoiceInfo,
} from '../actions';
import LanguageSelect from './LanguageSelect';
import { fetchPublicationsAsync } from '../../content/actions';
import VoiceLists from './VoiceLists';

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
    settings: {
      settingsOpen,
      showVocalization,
      targetLang,
      eligibleVoices,
      selectedVoices,
    },
    content: { publications: topics, loading, error },
  } = useSelector((state: RootState) => state);
  const [lang, setLang] = useState(targetLang);
  const [nonSelectedVoices, setNonSelectedVoices] = useState<IVoiceInfo[]>([]);

  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    dispatch(loadVoicesAsync(topics));
  }, [dispatch, topics]);

  useEffect(() => {
    const isNotSelected = (voice: IVoiceInfo) =>
      !selectedVoices.find(v => v.name !== voice.name);
    setNonSelectedVoices(eligibleVoices.filter(isNotSelected));
  }, [eligibleVoices, selectedVoices]);

  const publicationsLoaded = topics.length !== 0;

  useEffect(() => {
    if (!publicationsLoaded) {
      dispatch(fetchPublicationsAsync());
    }
  }, [dispatch, publicationsLoaded]);

  if (loading) {
    return null;
  }

  const onClose = () => {
    dispatch(setTargetLang(lang!));
    dispatch(closeSettings());
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
        <LanguageSelect topics={topics} lang={lang} onChange={setLang} />
        <VoiceLists selected={selectedVoices} nonSelected={nonSelectedVoices} />

        {lang === 'ar' && (
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={showVocalization}
                  onChange={() => dispatch(toggleVocalization())}
                />
              }
              label={t('show_arabic_vocalization')}
            />
          </FormGroup>
        )}
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
