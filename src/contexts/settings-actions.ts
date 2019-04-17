import { action } from 'typesafe-actions';
import * as C from './settings-constants';

export const toggleVocalization = () => action(C.TOGGLE_VOCALIZATION);
export const toggleTranscription = () => action(C.TOGGLE_TRANSCRIPTION);
export const toggleFlashcards = () => action(C.TOGGLE_FLASHCARDS);
export const setRomanizationSystem = (romanizationStandard: string) =>
  action(C.SET_ROMANIZATION_STANDARD, romanizationStandard);
export const toggleVoice = () => action(C.TOGGLE_VOICE);
export const setVoiceName = (voiceName: string) => action(C.SET_VOICE_NAME, voiceName);
