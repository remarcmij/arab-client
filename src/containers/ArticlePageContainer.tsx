import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Types from 'Types'
import ArticlePage from '../components/ArticlePage'
import { articleActions, articleSelectors } from '../features/article'
import { FetchActions } from '../features/article/actions'

const mapStateToProps = (state: Types.RootState) => ({
  document: articleSelectors.getDocument(state),
  isLoading: articleSelectors.getIsLoading(state),
  error: articleSelectors.getError(state),
})

const mapDispatchToProps = (dispatch: Dispatch<FetchActions>) => ({
  fetchArticle: articleActions.fetchArticle(dispatch),
})

const ArticlePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlePage)

export default ArticlePageContainer
