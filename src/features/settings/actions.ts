import { action } from 'typesafe-actions';
import {
  CLOSE_SETTINGS,
  OPEN_SETTINGS,
  SET_ROMANIZATION_STANDARD,
  SET_VOICE_NAME,
  TOGGLE_TRANSCRIPTION,
  TOGGLE_VOCALIZATION,
} from './constants';

export const openSettings = () => action(OPEN_SETTINGS);
export const closeSettings = () => action(CLOSE_SETTINGS);
export const toggleVocalization = () => action(TOGGLE_VOCALIZATION);
export const toggleTranscription = () => action(TOGGLE_TRANSCRIPTION);
export const setRomanizationSystem = (romanizationStandard: string) =>
  action(SET_ROMANIZATION_STANDARD, romanizationStandard);
export const setVoiceName = (voiceName: string) =>
  action(SET_VOICE_NAME, voiceName);
