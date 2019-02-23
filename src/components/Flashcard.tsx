import Paper from '@material-ui/core/Paper'
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'
import Types from 'Types'
import SpeechSynthesizer from '../services/SpeechSynthesizer'
import Transcoder from '../services/Transcoder'

const styles = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  arabic: {
    fontFamily: 'Arial',
  },
})

interface Props extends WithStyles<typeof styles> {
  lemma: Types.Lemma
  showTranslation: boolean
  showVocalization: boolean
  speechEnabled: boolean
  voiceName: string
}

const Flashcard: React.FC<Props> = props => {
  const { lemma, showTranslation, showVocalization, speechEnabled, voiceName, classes } = props

  if (speechEnabled && voiceName !== 'none') {
    // tslint:disable-next-line:no-floating-promises
    SpeechSynthesizer.speak(voiceName, lemma.foreign, showTranslation ? 0.5 : 0.8)
  }

  return (
    <Paper className={classes.root}>
      <Typography variant="h3" lang="foreign" dir="rtl">
        {showVocalization ? lemma.foreign : Transcoder.stripTashkeel(lemma.foreign)}
      </Typography>
      <Typography variant="h4" color="textSecondary">
        {showTranslation ? lemma.base : '•••'}
      </Typography>
    </Paper>
  )
}

export default withStyles(styles)(Flashcard)
