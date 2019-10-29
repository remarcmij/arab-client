import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import Types from 'Types';
import LanguageContext from '../contexts/LanguageContext';
import SpeechSynthesizer from '../services/SpeechSynthesizer';
import Transcoder from '../services/Transcoder';

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
  lemma: Types.Lemma;
  showTranslation: boolean;
  showVocalization: boolean;
  voiceName: string;
}>;

// tslint:disable:no-floating-promises

const handleClick = (props: Props) => {
  const { lemma, showTranslation, voiceName } = props;
  if (voiceName) {
    SpeechSynthesizer.speak(
      voiceName,
      lemma.foreign,
      showTranslation ? 0.6 : 0.8,
    );
  }
};

const Flashcard: React.FC<Props> = props => {
  const { lemma, showTranslation, showVocalization, voiceName } = props;
  const classes = useStyles();
  const { sourceLang, targetLang } = useContext(LanguageContext);

  if (voiceName) {
    SpeechSynthesizer.speak(
      voiceName,
      lemma.foreign,
      showTranslation ? 0.6 : 0.8,
    );
  }

  return (
    <Paper
      className={classes.root}
      elevation={2}
      onClick={() => handleClick(props)}
    >
      <Tooltip
        classes={{ tooltip: classes.htmlTooltip }}
        title={<Typography color="inherit">{lemma.roman}</Typography>}
      >
        <Typography
          variant="h4"
          align="center"
          lang={targetLang}
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
        lang={sourceLang}
        color="textSecondary"
        className={classes.native}
      >
        {showTranslation ? lemma.native : '•••'}
      </Typography>
    </Paper>
  );
};

export default Flashcard;
