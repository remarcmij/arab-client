import * as React from 'react'
import { match } from 'react-router'
import Flashcard from '../components/Flashcard'
import FlashcardButtonBar from '../components/FlashcardButtonBar'
import Fetcher from '../services/Fetcher'

type Params = {
  publication: string
  chapter: string
}

type Props = {
  match: match<Params>
}

type State = {
  lemmas: Lemma[]
  index: number
}

class FlashcardPage extends React.Component<Props, State> {
  state: State = {
    lemmas: [],
    index: 0,
  }

  async componentDidMount() {
    const { publication, chapter } = this.props.match.params
    const doc: IWordList = await Fetcher.fetchJSON(
      `${process.env.REACT_APP_API_URL}/${publication}/${chapter}`,
    )
    this.setState({ lemmas: doc.data })
  }

  handleNext = () => {
    const { index, lemmas } = this.state
    if (index < lemmas.length - 1) {
      this.setState({ index: index + 1 })
    }
  }

  handlePrev = () => {
    const { index, lemmas } = this.state
    if (index > 0) {
      this.setState({ index: index - 1 })
    }
  }

  renderLemmas() {
    const { lemmas, index } = this.state
    return (
      <React.Fragment>
        {lemmas.length !== 0 && <Flashcard lemma={lemmas[index]} />}
        <FlashcardButtonBar onNext={this.handleNext} onPrev={this.handlePrev} />
      </React.Fragment>
    )
  }

  render() {
    return <ul>{this.renderLemmas()}</ul>
  }
}

export default FlashcardPage
