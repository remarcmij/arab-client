import * as React from 'react'
import { match, Redirect } from 'react-router'
import GridContainer from '../components/GridContainer'
import LemmaTable from '../components/LemmaTable'
import NavBar from '../components/NavBar'
import Fetcher from '../services/Fetcher'
import Types from 'Types'

interface Params {
  publication: string
  chapter: string
}

type Props = {
  match: match<Params>
}

type State = {
  lemmas: Types.Lemma[]
  error: Error | null
  goBack: boolean
}

class LemmaListPage extends React.Component<Props, State> {
  readonly state: State = {
    lemmas: [],
    error: null,
    goBack: false,
  }

  componentDidMount() {
    const { publication, chapter } = this.props.match.params

    Fetcher.fetchJSON(`${process.env.REACT_APP_API_URL}/${publication}/${chapter}`)
      .then(doc => {
        this.setState({
          lemmas: doc.data,
          error: null,
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  handleBack = () => void this.setState({ goBack: true })

  render() {
    const { goBack, error, lemmas } = this.state
    const { publication } = this.props.match.params

    if (goBack) {
      return <Redirect to={`/content/${publication}/index`} />
    }

    if (error) {
      return <div>Error: {error.message}</div>
    }

    return (
      <React.Fragment>
        <NavBar title="Arabisch" onBack={this.handleBack} />
        <GridContainer>
          <LemmaTable lemmas={lemmas} />
        </GridContainer>
      </React.Fragment>
    )
  }
}

export default LemmaListPage
