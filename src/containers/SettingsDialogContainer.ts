import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Types from 'Types'
import SettingsDialog from '../components/SettingsDialog'
import { settingsActions as actions, settingsSelectors as selectors } from '../features/settings'
import { SettingsAction } from '../features/settings/reducer'

const mapStateToProps = (state: Types.RootState) => ({
  showVocalization: selectors.getShowVocalization(state),
  showTranscription: selectors.getShowTranscription(state),
  showFlashcards: selectors.getShowFlashcards(state),
  romanizationStandard: selectors.getRomanization(state),
  speechEnabled: selectors.getSpeechEnabled(state),
  voiceName: selectors.getVoiceName(state),
})

const mapDispatchToProps = (dispatch: Dispatch<SettingsAction>) => ({
  toggleVocalization: () => dispatch(actions.toggleVocalization()),
  toggleTranscription: () => dispatch(actions.toggleTranscription()),
  toggleFlashcards: () => dispatch(actions.toggleFlashcards()),
  setRomanizationSystem: (romanizationStandard: string) =>
    dispatch(actions.setRomanizationSystem(romanizationStandard)),
  toggleSpeech: () => dispatch(actions.toggleSpeech()),
  setVoiceName: (voiceName: string) => dispatch(actions.setVoiceName(voiceName)),
})

const PublicationListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsDialog)

export default PublicationListPageContainer
