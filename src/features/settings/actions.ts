import { action } from 'typesafe-actions'
import * as C from './constants'

export const toggleVocalization = () => action(C.TOGGLE_VOCALIZATION)
export const toggleTranscription = () => action(C.TOGGLE_TRANSCRIPTION)
