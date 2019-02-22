import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Types from 'Types'
import SettingsDialog from '../components/SettingsDialog'
import { settingsActions, settingsSelectors } from '../features/settings'
import { SettingsAction } from '../features/settings/reducer'

const mapStateToProps = (state: Types.RootState) => ({
  showVocalization: settingsSelectors.getShowVocalization(state),
  showTranscription: settingsSelectors.getShowTranscription(state),
})

const mapDispatchToProps = (dispatch: Dispatch<SettingsAction>) => ({
  toggleVocalization: () => dispatch(settingsActions.toggleVocalization()),
  toggleTranscription: () => dispatch(settingsActions.toggleTranscription()),
})

const PublicationListPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsDialog)

export default PublicationListPageContainer
