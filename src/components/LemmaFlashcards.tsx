import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import React, { useState } from 'react'
import Types from 'Types'
import Flashcard from './Flashcard'
import FlashcardButtonBar from './FlashcardButtonBar'
import FlashcardHeader from './FlashcardHeader'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      // To fix IE11 flex min-height bug
      display: 'flex',
      flexDirection: 'column',
    },
  })

interface Props extends WithStyles<typeof styles> {
  document: Types.LemmaDocument
  showVocalization: boolean
  voiceEnabled: boolean
  voiceName: string
}

const LemmaFlashcards: React.FC<Props> = props => {
  const { document, showVocalization, voiceEnabled, voiceName, classes } = props

  const [index, setIndex] = useState<number>(0)
  const [showTranslation, setShowTranslation] = useState<boolean>(false)

  const handleNext = () => {
    if (!showTranslation) {
      setShowTranslation(true)
    } else if (index < props.document.body.length - 1) {
      setIndex(index + 1)
      setShowTranslation(false)
    }
  }

  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1)
    }
    setShowTranslation(false)
  }

  const { body: lemmas } = document

  return (
    <div className={classes.root}>
      <FlashcardHeader document={document} index={index} length={document.body.length} />
      {lemmas.length !== 0 && (
        <Flashcard
          lemma={lemmas[index]}
          showTranslation={showTranslation}
          showVocalization={showVocalization}
          voiceEnabled={voiceEnabled}
          voiceName={voiceName}
        />
      )}
      <FlashcardButtonBar onNext={handleNext} onPrev={handlePrev} />
    </div>
  )
}

export default withStyles(styles)(LemmaFlashcards)
