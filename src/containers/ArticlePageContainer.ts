import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Types from 'Types';
import ArticlePage from '../components/ArticlePage';
import { articleActions, articleSelectors } from '../features/article';
import { settingsActions, settingsSelectors } from '../features/settings';
import { ArticleActions } from '../features/article/actions';
import { SettingsAction } from '../features/settings/reducer';

const mapStateToProps = (state: Types.RootState) => ({
  document: articleSelectors.getDocument(state),
  isLoading: articleSelectors.getIsLoading(state),
  error: articleSelectors.getError(state),
  showFlashcards: settingsSelectors.getShowFlashcards(state),
  showVocalization: settingsSelectors.getShowVocalization(state),
  showTranscription: settingsSelectors.getShowTranscription(state),
  romanizationStandard: settingsSelectors.getRomanization(state),
  voiceEnabled: settingsSelectors.getVoiceEnabled(state),
  voiceName: settingsSelectors.getVoiceName(state),
});

const mapDispatchToProps = (dispatch: Dispatch<ArticleActions | SettingsAction>) => ({
  fetchArticle: articleActions.fetchArticle(dispatch),
  clear: () => dispatch(articleActions.clear()),
  toggleVoice: () => dispatch(settingsActions.toggleVoice()),
});

const ArticlePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticlePage);

export default ArticlePageContainer;
