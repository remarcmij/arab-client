import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Types from 'Types'
import SettingsDialog from '../components/SettingsDialog'
import { settingsActions, settingsSelectors } from '../features/settings'
import { SettingsAction } from '../features/settings/reducer'
import { RomanizationSystems } from '../services/Transcoder'

const mapStateToProps = (state: Types.RootState) => ({
  showVocalization: settingsSelectors.getShowVocalization(state),
  showTranscription: settingsSelectors.getShowTranscription(state),
  romanization: settingsSelectors.getRomanization(state),
})

const mapDispatchToProps = (dispatch: Dispatch<SettingsAction>) => ({
  toggleVocalization: () => dispatch(settingsActions.toggleVocalization()),
  toggleTranscription: () => dispatch(settingsActions.toggleTranscription()),
  setRomanizationSystem: (romanization: keyof RomanizationSystems) =>
    dispatch(settingsActions.setRomanizationSystem(romanization)),
})

const PublicationListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsDialog)

export default PublicationListPageContainer
