import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import * as React from 'react'
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

type State = {
  index: number
  showTranslation: boolean
}

class LemmaFlashcards extends React.Component<Props, State> {
  readonly state: State = {
    index: 0,
    showTranslation: false,
  }

  handleNext = () => {
    const { index, showTranslation } = this.state
    if (!showTranslation) {
      this.setState({ showTranslation: true })
      return
    }
    if (index < this.props.document.body.length - 1) {
      this.setState({ index: index + 1, showTranslation: false })
    }
  }

  handlePrev = () => {
    let { index } = this.state
    if (index > 0) {
      index--
    }
    this.setState({ index, showTranslation: false })
  }

  render() {
    const { index, showTranslation } = this.state
    const { document, showVocalization, voiceEnabled, voiceName, classes } = this.props
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
        <FlashcardButtonBar onNext={this.handleNext} onPrev={this.handlePrev} />
      </div>
    )
  }
}

export default withStyles(styles)(LemmaFlashcards)
