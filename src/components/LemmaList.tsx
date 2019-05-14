import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import Types from 'Types';
import SpeechSynthesizer from '../services/SpeechSynthesizer';
import Transcoder from '../services/Transcoder';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing.unit,
      },
      padding: theme.spacing.unit,
      userSelect: 'none',
    },
    listItem: {
      marginBottom: theme.spacing.unit * 2,
    },
    extra: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
    },
    lemmas: {
      marginBlockStart: 0,
      marginBlockEnd: 0,
    },
    source: {
      color: theme.palette.primary.main,
    },
    roman: {
      fontFamily: 'Georgia',
      fontStyle: 'italic',
    },
    target: {
      marginBottom: theme.spacing.unit,
      marginLeft: theme.spacing.unit * 4,
    },
  });

interface OwnProps {
  document: Types.LemmaDocument;
  showVocalization: boolean;
  showTranscription: boolean;
  romanizationStandard: string;
  voiceName: string;
}

type Props = OwnProps & WithStyles<typeof styles>;

const handleClick = (voiceName: string, target: string) => {
  if (voiceName) {
    // tslint:disable-next-line:no-floating-promises
    SpeechSynthesizer.speak(voiceName, target);
  }
};

const LemmaList: React.FC<Props> = ({
  document,
  showVocalization,
  showTranscription,
  romanizationStandard,
  voiceName,
  classes,
}) => {
  const renderLemma = (lemma: Types.Lemma, index: number) => (
    <li key={index} className={classes.listItem}>
      <Typography
        variant="h6"
        classes={{ h6: classes.source }}
        color="textPrimary"
      >
        <span dir="ltr">{lemma.source}</span>
      </Typography>
      <Typography
        variant="h4"
        classes={{ h4: classes.target }}
        color="textPrimary"
        onClick={() => handleClick(voiceName, lemma.target)}
      >
        <span dir="rtl">
          {showVocalization
            ? lemma.target
            : Transcoder.stripTashkeel(lemma.target)}
        </span>
      </Typography>
      {lemma.roman && showTranscription && (
        <Typography
          variant="body1"
          classes={{ body1: classes.roman }}
          color="textSecondary"
        >
          <span dir="ltr">
            {Transcoder.applyRomanization(lemma.roman, romanizationStandard)}
          </span>
        </Typography>
      )}
    </li>
  );

  const { title, subtitle, prolog, epilog, body: lemmas } = document;

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" gutterBottom={true}>
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h6"
          gutterBottom={true}
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      )}
      {prolog && (
        <React.Fragment>
          <section
            dangerouslySetInnerHTML={{ __html: prolog }}
            className={`markdown-body ${classes.extra}`}
          />
          <Divider />
        </React.Fragment>
      )}
      <ul dir="rtl" className={classes.lemmas}>
        {lemmas.map(renderLemma)}
      </ul>
      {epilog && (
        <React.Fragment>
          <Divider />
          <section
            dangerouslySetInnerHTML={{ __html: epilog }}
            className={`markdown-body ${classes.extra}`}
          />
        </React.Fragment>
      )}
    </Paper>
  );
};

export default withStyles(styles)(LemmaList);
