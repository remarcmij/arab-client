import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Types from 'Types'
import FlashcardsPage from '../components/FlashcardsPage'
import { articleActions, articleSelectors } from '../features/article'
import { ArticleActions } from '../features/article/actions'
import { settingsActions, settingsSelectors } from '../features/settings'
import { SettingsAction } from '../features/settings/reducer'

const mapStateToProps = (state: Types.RootState) => ({
  isLoading: articleSelectors.getIsLoading(state),
  error: articleSelectors.getError(state),
  document: articleSelectors.getDocument(state) as Types.LemmaDocument,
  showVocalization: settingsSelectors.getShowVocalization(state),
  showTranscription: settingsSelectors.getShowTranscription(state),
  romanizationStandard: settingsSelectors.getRomanization(state),
  voiceEnabled: settingsSelectors.getVoiceEnabled(state),
  voiceName: settingsSelectors.getVoiceName(state),
})

const mapDispatchToProps = (dispatch: Dispatch<ArticleActions | SettingsAction>) => ({
  fetchArticle: articleActions.fetchArticle(dispatch),
  clear: () => dispatch(articleActions.clear()),
  toggleVoice: () => dispatch(settingsActions.toggleVoice()),
})

const FlashcardPagesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FlashcardsPage)

export default FlashcardPagesContainer
