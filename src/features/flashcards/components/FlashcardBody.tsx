import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { ILemma } from 'Types';
import { getLanguageService } from '../../../services/language';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 280,
      margin: theme.spacing(1),
      cursor: 'pointer',
      userSelect: 'none',
    },
    ar: {
      fontFamily: 'Arial',
      margin: theme.spacing(1),
    },
    native: {
      margin: theme.spacing(1),
    },
    htmlTooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
      '& b': {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
  }),
);

type Props = Readonly<{
  lemma: ILemma;
  showTranslation: boolean;
}>;

const FlashcardBody: React.FC<Props> = props => {
  const { lemma, showTranslation } = props;
  const classes = useStyles();

  const foreignLS = getLanguageService(lemma.foreignLang);
  const nativeLS = getLanguageService(lemma.nativeLang);

  return (
    <Paper className={classes.root}>
      <Tooltip
        classes={{ tooltip: classes.htmlTooltip }}
        title={<Typography color="inherit">{lemma.roman}</Typography>}
      >
        <Typography
          variant="h4"
          align="center"
          lang={lemma.foreignLang}
          className={classes.ar}
        >
          {foreignLS.formatForDisplay(lemma.foreign)}
        </Typography>
      </Tooltip>
      <Typography
        variant="h5"
        align="center"
        lang={lemma.nativeLang}
        color="textSecondary"
        className={classes.native}
      >
        {showTranslation ? nativeLS.formatForDisplay(lemma.native) : '•••'}
      </Typography>
    </Paper>
  );
};

export default FlashcardBody;
