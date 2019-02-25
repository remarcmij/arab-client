import Paper from '@material-ui/core/Paper'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import Types from 'Types'
import Transcoder from '../services/Transcoder'
import Divider from '@material-ui/core/Divider'
import SpeechSynthesizer from '../services/SpeechSynthesizer'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing.unit * 2,
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
    base: {
      color: theme.palette.primary.main,
    },
    trans: {
      fontFamily: 'Georgia',
      fontStyle: 'italic',
    },
    foreign: {
      marginBottom: theme.spacing.unit,
      marginLeft: theme.spacing.unit * 4,
    },
  })

interface Props extends WithStyles<typeof styles> {
  document: Types.LemmaDocument
  showVocalization: boolean
  showTranscription: boolean
  romanizationStandard: string
  voiceName: string
  voiceEnabled: boolean
}

const handleClick = (voiceEnabled: boolean, voiceName: string, foreign: string) => {
  if (voiceEnabled && voiceName !== 'none') {
    // tslint:disable-next-line:no-floating-promises
    SpeechSynthesizer.speak(voiceName, foreign)
  }
}

const LemmaList: React.FC<Props> = ({
  document,
  showVocalization,
  showTranscription,
  romanizationStandard,
  voiceEnabled,
  voiceName,
  classes,
}) => {
  const renderLemma = (lemma: Types.Lemma, index: number) => (
    <li key={index} className={classes.listItem}>
      <Typography variant="h6" classes={{ h6: classes.base }} color="textPrimary">
        <span dir="ltr">{lemma.base}</span>
      </Typography>
      <Typography
        variant="h4"
        classes={{ h4: classes.foreign }}
        color="textPrimary"
        onClick={() => handleClick(voiceEnabled, voiceName, lemma.foreign)}
      >
        <span dir="rtl">
          {showVocalization ? lemma.foreign : Transcoder.stripTashkeel(lemma.foreign)}
        </span>
      </Typography>
      {lemma.trans && showTranscription && (
        <Typography variant="body1" classes={{ body1: classes.trans }} color="textSecondary">
          <span dir="ltr">{Transcoder.applyRomanization(lemma.trans, romanizationStandard)}</span>
        </Typography>
      )}
    </li>
  )

  const { title, subtitle, prolog, epilog, data: lemmas } = document

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
  )
}

export default withStyles(styles)(LemmaList)
