import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Types from 'Types'
import ArticleListPage from '../components/ArticleListPage'
import { articleListActions, articleListSelectors } from '../features/articles'
import { FetchActions } from '../features/articles/actions'

const mapStateToProps = (state: Types.RootState) => ({
  documents: articleListSelectors.getDocuments(state),
  isLoading: articleListSelectors.getIsLoading(state),
  error: articleListSelectors.getError(state),
})

const mapDispatchToProps = (dispatch: Dispatch<FetchActions>) => ({
  fetchArticleList: articleListActions.fetchArticleList(dispatch),
})

const ArticleListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleListPage)

export default ArticleListPageContainer
