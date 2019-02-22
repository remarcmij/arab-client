import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Types from 'Types'
import PublicationListPage from '../components/PublicationListPage'
import { publicationsActions, publicationsSelectors } from '../features/publications'
import { FetchActions } from '../features/publications/actions'

const mapStateToProps = (state: Types.RootState) => ({
  documents: publicationsSelectors.getDocuments(state),
  isLoading: publicationsSelectors.getIsLoading(state),
  error: publicationsSelectors.getError(state),
})

const mapDispatchToProps = (dispatch: Dispatch<FetchActions>) => ({
  fetchPublicationList: publicationsActions.fetchPublicationList(dispatch),
})

const PublicationListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PublicationListPage)

export default PublicationListPageContainer
