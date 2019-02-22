import * as React from 'react'
import Types from 'Types'
import PublicationListItem from './PublicationListItem'
import GridContainer from '../components/GridContainer'
import NavBar from '../components/NavBar'

interface IParams {
  publication: string
  chapter: string
}

type Props = {
  documents: Types.AppDocument[]
  isLoading: boolean
  error: Error | null
  fetchPublicationList: () => void
}

class PublicationListPage extends React.Component<Props> {
  componentDidMount() {
    this.props.fetchPublicationList()
  }

  renderContent() {
    const { isLoading, error, documents } = this.props

    if (isLoading) {
      return <p>Loading...</p>
    }

    if (error) {
      return <p>Error: {error.message}</p>
    }

    return (
      <ul>
        {documents.map(doc => (
          <PublicationListItem key={`${doc.publication}.${doc.chapter}`} publication={doc} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <React.Fragment>
        <NavBar title="Arabisch" onLeftMenu={() => undefined} />
        <GridContainer>{this.renderContent()}</GridContainer>
      </React.Fragment>
    )
  }
}

export default PublicationListPage
