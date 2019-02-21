import { combineReducers } from 'redux'
import { settingsReducer } from '../features/settings'

const rootReducer = combineReducers({
  settings: settingsReducer,
})

export default rootReducer
