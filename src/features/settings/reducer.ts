import { combineReducers } from 'redux'
import { ActionType } from 'typesafe-actions'
import * as settings from './actions'
import { TOGGLE_VOCALIZATION, TOGGLE_TRANSCRIPTION } from './constants'

export type SettingsAction = ActionType<typeof settings>

export type SettingsState = {
  readonly showVocalization: boolean
  readonly showTranscription: boolean
}

export default combineReducers<SettingsState, SettingsAction>({
  showTranscription: (state = true, action) => {
    switch (action.type) {
      case TOGGLE_TRANSCRIPTION:
        return !state

      default:
        return state
    }
  },
  showVocalization: (state = true, action) => {
    switch (action.type) {
      case TOGGLE_VOCALIZATION:
        return !state

      default:
        return state
    }
  },
})
