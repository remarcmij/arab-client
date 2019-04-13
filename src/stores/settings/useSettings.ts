import { useReducer } from 'react';
import { ActionType, createAction } from 'typesafe-actions';
import * as actions from './actions';
import * as C from './constants';

const LOCAL_STORAGE_KEY = '@arab/setting';

export type SettingsAction = ActionType<typeof actions>;

export type SettingsState = {
  readonly showVocalization: boolean;
  readonly showTranscription: boolean;
  readonly showFlashcards: boolean;
  readonly romanizationStandard: string;
  readonly voiceEnabled: boolean;
  readonly voiceName: string;
};

let initialState = {
  showVocalization: true,
  showTranscription: true,
  showFlashcards: false,
  romanizationStandard: 'din',
  voiceEnabled: false,
  voiceName: 'none',
};

const reducer = (state: SettingsState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case C.TOGGLE_VOCALIZATION:
      return { ...state, showVocalization: !state.showVocalization };
    case C.TOGGLE_TRANSCRIPTION:
      return { ...state, showTranscription: !state.showTranscription };
    case C.TOGGLE_FLASHCARDS:
      return { ...state, showFlashcards: !state.showFlashcards };
    case C.SET_ROMANIZATION_STANDARD:
      return { ...state, romanizationStandard: action.payload };
    case C.TOGGLE_VOICE:
      return { ...state, voiceEnabled: !state.voiceEnabled };
    case C.SET_VOICE_NAME:
      return { ...state, voiceName: action.payload };
    default:
      return state;
  }
};

const persistentReducer = (state: SettingsState, action: SettingsAction): SettingsState => {
  const newState = reducer(state, action);
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
  return newState;
};

const stateString = window.localStorage.getItem(LOCAL_STORAGE_KEY);

if (stateString) {
  try {
    initialState = JSON.parse(stateString) as SettingsState;
  } catch (_) {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}

export default () => useReducer(persistentReducer, initialState);
