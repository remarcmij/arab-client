import * as React from 'react'
import { match } from 'react-router'
import ContentList from '../components/ContentList'
import GridContainer from '../components/GridContainer'
import NavBar from '../components/NavBar'
import Fetcher from '../services/Fetcher'
import { Document } from 'Types'

interface IParams {
  publication: string
  chapter: string
}

type Props = {
  match: match<IParams>
}

type State = {
  publications: Document[]
  error: Error | null
}

class ContentPage extends React.Component<Props, State> {
  readonly state: State = {
    publications: [],
    error: null,
  }

  componentDidMount() {
    Fetcher.fetchJSON(`${process.env.REACT_APP_API_URL}`)
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

  public render() {
    return (
      <React.Fragment>
        <NavBar title="Arabisch" onMenu={() => console.log('menu')} />
        <GridContainer>
          <ContentList publications={this.state.publications} />
        </GridContainer>
      </React.Fragment>
    )
  }
}

export default ContentPage
