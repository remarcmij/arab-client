import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles'
import * as React from 'react'
import Types from 'Types'
import Flashcard from './Flashcard'
import FlashcardButtonBar from './FlashcardButtonBar'
import Paper from '@material-ui/core/Paper'
import FlashcardHeader from './FlashcardHeader'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing.unit,
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
    if (index < this.props.document.data.length - 1) {
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
    const { document, showVocalization, voiceEnabled, voiceName } = this.props
    const { data: lemmas } = document

    return (
      <React.Fragment>
        <FlashcardHeader document={document} index={index} length={document.data.length} />
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
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(LemmaFlashcards)
