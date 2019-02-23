import { combineReducers } from 'redux'
import { ActionType } from 'typesafe-actions'
import * as settings from './actions'
import * as C from './constants'

export type SettingsAction = ActionType<typeof settings>

export type SettingsState = {
  readonly showVocalization: boolean
  readonly showTranscription: boolean
  readonly showFlashcards: boolean
  readonly romanizationStandard: string
  readonly speechEnabled: boolean
  readonly voiceName: string
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
  showFlashcards: (state = false, action) => {
    switch (action.type) {
      case C.TOGGLE_FLASHCARDS:
        return !state
      default:
        return state
    }
  },
  romanizationStandard: (state = 'din', action) => {
    switch (action.type) {
      case C.SET_ROMANIZATION_STANDARD:
        return action.payload
      default:
        return state
    }
  },
  speechEnabled: (state = false, action) => {
    switch (action.type) {
      case C.TOGGLE_SPEECH:
        return !state
      default:
        return state
    }
  },
  voiceName: (state = 'none', action) => {
    switch (action.type) {
      case C.SET_VOICE_NAME:
        return action.payload
      default:
        return state
    }
  },
})
