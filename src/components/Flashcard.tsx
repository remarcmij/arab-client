import Paper from '@material-ui/core/Paper';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import React, { useContext } from 'react';
import Types from 'Types';
import SpeechSynthesizer from '../services/SpeechSynthesizer';
import Transcoder from '../services/Transcoder';
import LanguageContext from '../contexts/LaunguageContext';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 280,
      margin: theme.spacing.unit,
      cursor: 'pointer',
      userSelect: 'none',
    },
    foreign: {
      fontFamily: 'Arial',
      margin: theme.spacing.unit,
    },
    native: {
      margin: theme.spacing.unit,
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
  });

interface OwnProps {
  lemma: Types.Lemma;
  showTranslation: boolean;
  showVocalization: boolean;
  voiceEnabled: boolean;
  voiceName: string;
}

type Props = OwnProps & WithStyles<typeof styles>;

// tslint:disable:no-floating-promises

const handleClick = (props: Props) => {
  const { lemma, showTranslation, voiceEnabled, voiceName } = props;
  if (voiceName !== 'none' && voiceEnabled) {
    SpeechSynthesizer.speak(voiceName, lemma.foreign, showTranslation ? 0.6 : 0.8);
  }
};

const Flashcard: React.FC<Props> = props => {
  const { lemma, showTranslation, showVocalization, voiceEnabled, voiceName, classes } = props;
  const { base, foreign } = useContext(LanguageContext);

  if (voiceEnabled && voiceName !== 'none') {
    SpeechSynthesizer.speak(voiceName, lemma.foreign, showTranslation ? 0.6 : 0.8);
  }

  return (
    <Paper className={classes.root} elevation={2} onClick={() => handleClick(props)}>
      <Tooltip
        classes={{ tooltip: classes.htmlTooltip }}
        title={<Typography color="inherit">{lemma.trans}</Typography>}
      >
        <Typography
          variant="h4"
          align="center"
          lang={foreign}
          dir="rtl"
          className={classes.foreign}
        >
          {showVocalization ? lemma.foreign : Transcoder.stripTashkeel(lemma.foreign)}
        </Typography>
      </Tooltip>
      <Typography
        variant="h5"
        align="center"
        lang={base}
        color="textSecondary"
        className={classes.native}
      >
        {showTranslation ? lemma.base : '•••'}
      </Typography>
    </Paper>
  );
};

export default withStyles(styles)(Flashcard);
