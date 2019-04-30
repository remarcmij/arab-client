import Paper from '@material-ui/core/Paper';
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';
import Types from 'Types';
import Transcoder from '../services/Transcoder';
import SpeechSynthesizer from '../services/SpeechSynthesizer';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing.unit,
      },
      userSelect: 'none',
    },
    mdPadding: {
      paddingTop: theme.spacing.unit * 3,
      paddingRight: theme.spacing.unit * 3,
      paddingLeft: theme.spacing.unit * 3,
    },
    foreignCell: {
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.secondary.main,
      },
    },
    base: {
      color: theme.palette.primary.main,
    },
    trans: {
      fontFamily: 'Georgia',
      fontStyle: 'italic',
    },
    foreign: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit / 2,
    },
  });

interface OwnProps {
  document: Types.LemmaDocument;
  showVocalization: boolean;
  showTranscription: boolean;
  romanizationStandard: string;
  voiceName: string;
  voiceEnabled: boolean;
}

type Props = OwnProps & WithStyles<typeof styles>;

const handleClick = (
  voiceEnabled: boolean,
  voiceName: string,
  foreign: string,
) => {
  if (voiceEnabled && voiceName !== 'none') {
    // tslint:disable-next-line:no-floating-promises
    SpeechSynthesizer.speak(voiceName, foreign);
  }
};

const LemmaTable: React.FC<Props> = ({
  document,
  showVocalization,
  showTranscription,
  romanizationStandard,
  voiceName,
  voiceEnabled,
  classes,
}) => {
  const renderLemma = (lemma: Types.Lemma, index: number) => (
    <TableRow key={index}>
      <TableCell align="left">
        <Typography
          variant="h6"
          classes={{ h6: classes.base }}
          color="textPrimary"
        >
          {lemma.base}
        </Typography>
      </TableCell>

      {lemma.trans && showTranscription && (
        <TableCell align="left">
          <Typography
            variant="h6"
            classes={{ h6: classes.trans }}
            color="textSecondary"
          >
            {Transcoder.applyRomanization(lemma.trans, romanizationStandard)}
          </Typography>
        </TableCell>
      )}
      <TableCell
        align="right"
        dir={'rtl'}
        classes={{ root: classes.foreignCell }}
        onClick={() => handleClick(voiceEnabled, voiceName, lemma.foreign)}
      >
        <Typography
          variant="h4"
          classes={{ h4: classes.foreign }}
          color="inherit"
        >
          {showVocalization
            ? lemma.foreign
            : Transcoder.stripTashkeel(lemma.foreign)}
        </Typography>
      </TableCell>
    </TableRow>
  );

  const { title, subtitle, prolog, epilog, body: wordlist } = document;

  return (
    <Paper className={classes.root}>
      <Typography variant="h5" className={classes.mdPadding}>
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h6"
          dangerouslySetInnerHTML={{ __html: subtitle }}
          className={classes.mdPadding}
        />
      )}
      {prolog && (
        <section
          dangerouslySetInnerHTML={{ __html: prolog }}
          className={`markdown-body ${classes.mdPadding}`}
        />
      )}
      <Table padding="dense">
        <TableBody>{wordlist.map(renderLemma)}</TableBody>
      </Table>
      {epilog && (
        <section
          dangerouslySetInnerHTML={{ __html: epilog }}
          className={`markdown-body ${classes.mdPadding}`}
        />
      )}
    </Paper>
  );
};

export default withStyles(styles)(LemmaTable);
