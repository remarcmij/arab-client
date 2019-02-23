import { combineReducers } from 'redux'
import { ActionType } from 'typesafe-actions'
import * as settings from './actions'
import * as C from './constants'
import { RomanizationSystems } from '../../services/Transcoder'

export type SettingsAction = ActionType<typeof settings>

export type SettingsState = {
  readonly showVocalization: boolean
  readonly showTranscription: boolean
  readonly romanization: keyof RomanizationSystems
}

export default combineReducers<SettingsState, SettingsAction>({
  showTranscription: (state = true, action) => {
    switch (action.type) {
      case C.TOGGLE_TRANSCRIPTION:
        return !state
      default:
        return state
    }
  },
  showVocalization: (state = true, action) => {
    switch (action.type) {
      case C.TOGGLE_VOCALIZATION:
        return !state
      default:
        return state
    }
  },
  romanization: (state = 'iso', action) => {
    switch (action.type) {
      case C.SET_ROMANIZATION:
        return action.payload
      default:
        return state
    }
  },
})
