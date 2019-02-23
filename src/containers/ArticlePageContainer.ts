import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Types from 'Types'
import ArticlePage from '../components/ArticlePage'
import { articleActions, articleSelectors } from '../features/article'
import { settingsSelectors } from '../features/settings'
import { FetchActions } from '../features/article/actions'

const mapStateToProps = (state: Types.RootState) => ({
  document: articleSelectors.getDocument(state),
  isLoading: articleSelectors.getIsLoading(state),
  error: articleSelectors.getError(state),
  showFlashcards: settingsSelectors.getShowFlashcards(state),
  showVocalization: settingsSelectors.getShowVocalization(state),
  showTranscription: settingsSelectors.getShowTranscription(state),
  romanizationStandard: settingsSelectors.getRomanization(state),
  speechEnabled: settingsSelectors.getSpeechEnabled(state),
  voiceName: settingsSelectors.getVoiceName(state),
})

const mapDispatchToProps = (dispatch: Dispatch<FetchActions>) => ({
  fetchArticle: articleActions.fetchArticle(dispatch),
})

const ArticlePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlePage)

export default ArticlePageContainer
