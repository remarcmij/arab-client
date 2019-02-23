import { action } from 'typesafe-actions'
import * as C from './constants'
import { RomanizationSystems } from '../../services/Transcoder'

export const toggleVocalization = () => action(C.TOGGLE_VOCALIZATION)
export const toggleTranscription = () => action(C.TOGGLE_TRANSCRIPTION)
export const setRomanizationSystem = (romanization: keyof RomanizationSystems) =>
  action(C.SET_ROMANIZATION, romanization)
