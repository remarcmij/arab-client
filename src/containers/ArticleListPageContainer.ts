import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Types from 'Types'
import ArticleListPage from '../components/ArticleListPage'
import {
  articleListActions as actions,
  articleListSelectors as selectors,
} from '../features/articles'
import { ArticlesActions } from '../features/articles/actions'

const mapStateToProps = (state: Types.RootState) => ({
  documents: selectors.getDocuments(state),
  isLoading: selectors.getIsLoading(state),
  error: selectors.getError(state),
})

const mapDispatchToProps = (dispatch: Dispatch<ArticlesActions>) => ({
  fetchArticleList: actions.fetchArticleList(dispatch),
  clear: () => dispatch(actions.clear()),
})

const ArticleListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleListPage)

export default ArticleListPageContainer
