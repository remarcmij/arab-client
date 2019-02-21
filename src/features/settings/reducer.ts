import { combineReducers } from 'redux'
import { ActionType } from 'typesafe-actions'
import * as settings from './actions'
import { TOGGLE_HIDE_VOCALIZATION } from './constants'

export type SettingsAction = ActionType<typeof settings>

export type SettingsState = {
  readonly hideVocalization: boolean
}

export default combineReducers<SettingsState, SettingsAction>({
  hideVocalization: (state = false, action) => {
    switch (action.type) {
      case TOGGLE_HIDE_VOCALIZATION:
        return !state

      default:
        return state
    }
  },
})
