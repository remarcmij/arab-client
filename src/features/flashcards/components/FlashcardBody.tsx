import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import Types from 'Types';
import LanguageContext from '../../../contexts/LanguageContext';
import Transcoder from '../../../services/Transcoder';

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
  lemma: Types.ILemma;
  showTranslation: boolean;
  showVocalization: boolean;
  foreignVoice: string;
}>;

const FlashcardBody: React.FC<Props> = props => {
  const { lemma, showTranslation, showVocalization } = props;
  const classes = useStyles();
  const { native, foreign } = useContext(LanguageContext);

  return (
    <Paper className={classes.root}>
      <Tooltip
        classes={{ tooltip: classes.htmlTooltip }}
        title={<Typography color="inherit">{lemma.roman}</Typography>}
      >
        <Typography
          variant="h4"
          align="center"
          lang={foreign}
          dir="rtl"
          className={classes.ar}
        >
          {showVocalization
            ? lemma.foreign
            : Transcoder.stripTashkeel(lemma.foreign)}
        </Typography>
      </Tooltip>
      <Typography
        variant="h5"
        align="center"
        lang={native}
        color="textSecondary"
        className={classes.native}
      >
        {showTranslation ? lemma.native : '•••'}
      </Typography>
    </Paper>
  );
};

export default FlashcardBody;
