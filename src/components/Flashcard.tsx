import Paper from '@material-ui/core/Paper'
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import Types from 'Types'
import SpeechSynthesizer from '../services/SpeechSynthesizer'
import Transcoder from '../services/Transcoder'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 200,
      margin: theme.spacing.unit,
      cursor: 'pointer',
    },
    foreign: {
      fontFamily: 'Arial',
      margin: theme.spacing.unit,
    },
    native: {
      margin: theme.spacing.unit,
    },
  })

interface Props extends WithStyles<typeof styles> {
  lemma: Types.Lemma
  showTranslation: boolean
  showVocalization: boolean
  speechEnabled: boolean
  voiceName: string
}

// tslint:disable:no-floating-promises

const handleClick = (props: Props) => {
  const { lemma, showTranslation, voiceName } = props
  if (voiceName !== 'none') {
    SpeechSynthesizer.speak(voiceName, lemma.foreign, showTranslation ? 0.6 : 0.8)
  }
}

const Flashcard: React.FC<Props> = props => {
  const { lemma, showTranslation, showVocalization, speechEnabled, voiceName, classes } = props

  if (speechEnabled && voiceName !== 'none') {
    SpeechSynthesizer.speak(voiceName, lemma.foreign, showTranslation ? 0.6 : 0.8)
  }

  return (
    <Paper className={classes.root} onClick={() => handleClick(props)}>
      <Typography variant="h4" align="center" lang="ar" dir="rtl" className={classes.foreign}>
        {showVocalization ? lemma.foreign : Transcoder.stripTashkeel(lemma.foreign)}
      </Typography>
      <Typography variant="h5" align="center" color="textSecondary" className={classes.native}>
        {showTranslation ? lemma.base : '•••'}
      </Typography>
    </Paper>
  )
}

export default withStyles(styles)(Flashcard)
