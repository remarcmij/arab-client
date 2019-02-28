import List from '@material-ui/core/List'
import * as React from 'react'
import Types from 'Types'
import GridContainer from '../components/GridContainer'
import NavBar from '../components/NavBar'
import PublicationListItem from './PublicationListItem'
import * as S from './strings'
import Paper from '@material-ui/core/Paper'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing.unit,
    },
  })

interface Props extends WithStyles<typeof styles> {
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

    // if (isLoading) {
    //   return <p>Loading...</p>
    // }

    if (error) {
      return <p>Error: {error.message}</p>
    }

    return (
      <List>
        {documents.map(doc => (
          <PublicationListItem key={`${doc.publication}.${doc.article}`} publication={doc} />
        ))}
      </List>
    )
  }

  render() {
    return (
      <React.Fragment>
        <NavBar title={S.APP_TITLE} showDrawerButton={true} enableSettingsMenu={true} />
        <GridContainer>
          <Paper classes={{ root: this.props.classes.root }}>{this.renderContent()}</Paper>
        </GridContainer>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(PublicationListPage)
