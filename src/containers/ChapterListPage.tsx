import * as React from 'react'
import { match, Redirect } from 'react-router'
import ChapterList from '../components/ChapterList'
import GridContainer from '../components/GridContainer'
import NavBar from '../components/NavBar'
import Fetcher from '../services/Fetcher'

interface IParams {
  publication: string
  chapter: string
}

type Props = {
  match: match<IParams>
}

type State = {
  publications: Publication[]
  error: Error | null
  goBack: boolean
}

class ChapterListPage extends React.Component<Props, State> {
  state: State = {
    publications: [],
    error: null,
    goBack: false,
  }

  componentDidMount() {
    const { publication } = this.props.match.params

    Fetcher.fetchJSON(`${process.env.REACT_APP_API_URL}/${publication}`)
      .then(data => {
        this.setState({
          publications: data,
          error: null,
        })
      })
      .catch(error => {
        this.setState({ error })
      })
  }

  handleBack = () => void this.setState({ goBack: true })

  render() {
    const { goBack, error, publications } = this.state

    if (goBack) {
      return <Redirect to="/content" />
    }

    if (error) {
      return <div>Error: {error.message}</div>
    }

    return (
      <React.Fragment>
        <NavBar title="Arabisch" onBack={this.handleBack} />
        <GridContainer>
          <ChapterList publications={publications} />
        </GridContainer>
      </React.Fragment>
    )
  }
}

export default ChapterListPage
