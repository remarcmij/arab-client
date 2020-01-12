import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  createStyles,
  makeStyles,
  Theme,
  useTheme,
} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'typesafe-actions';
import { fetchPublicationsAsync } from '../../content/actions';
import { setTargetLang } from '../actions';
import LanguageSelect from './LanguageSelect';

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

const LanguageDialog: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const dispatch = useDispatch();
  const {
    settings: { targetLang },
    content: { publications: topics, loading, error },
  } = useSelector((state: RootState) => state);

  const [lang, setLang] = useState(targetLang);

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
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={targetLang == null}
      onClose={onClose}
      aria-labelledby="responsive-dialog-title"
      classes={{ paper: classes.paper }}
    >
      <DialogTitle id="responsive-dialog-title">
        {t('choose_language')}
      </DialogTitle>
      <DialogContent>
        <LanguageSelect topics={topics} lang={lang} onChange={setLang} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={lang == null}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LanguageDialog;
