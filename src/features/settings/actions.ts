import { createAction } from 'typesafe-actions';

export const openSettings = createAction('@settings/OPEN')<void>();

export const closeSettings = createAction('@settings/CLOSE')<void>();

export const toggleVocalization = createAction('@settings/TOGGLE_VOCALIZATION')<
  void
>();

export const toggleTranscription = createAction(
  '@settings/TOGGLE_TRANSCRIPTION',
)<void>();

export const toggleShuffle = createAction('@settings/TOGGLE_SHUFFLE')<void>();

export const setRomanizationSystem = createAction(
  '@settings/SET_ROMANIZATION_STANDARD',
  (romanizationStandard: string) => romanizationStandard,
)<string>();

export const setVoiceName = createAction(
  '@settings/SET_VOICE_NAME',
  (voiceName: string) => voiceName,
)<string>();
