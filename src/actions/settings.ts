import { action } from 'typesafe-actions';
import {
  SET_ROMANIZATION_STANDARD,
  SET_VOICE_NAME,
  TOGGLE_TRANSCRIPTION,
  TOGGLE_VOCALIZATION,
} from './constants';

export const toggleVocalization = () => action(TOGGLE_VOCALIZATION);
export const toggleTranscription = () => action(TOGGLE_TRANSCRIPTION);
export const setRomanizationSystem = (romanizationStandard: string) =>
  action(SET_ROMANIZATION_STANDARD, romanizationStandard);
export const setVoiceName = (voiceName: string) =>
  action(SET_VOICE_NAME, voiceName);

export type SettingsActions =
  | ReturnType<typeof toggleVocalization>
  | ReturnType<typeof toggleTranscription>
  | ReturnType<typeof setRomanizationSystem>
  | ReturnType<typeof setVoiceName>;
