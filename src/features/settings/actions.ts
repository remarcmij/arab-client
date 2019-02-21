import { action } from 'typesafe-actions'
import { TOGGLE_HIDE_VOCALIZATION } from './constants'

export const toggleHideVocalization = () => action(TOGGLE_HIDE_VOCALIZATION)
