import React from 'react';
import { ActionType } from 'typesafe-actions';
import * as actions from './actions';
import * as C from './constants';

const LOCAL_STORAGE_KEY = '@arab/settings';

export type SettingsAction = ActionType<typeof actions>;

export type SettingsState = {
  readonly showVocalization: boolean;
  readonly showTranscription: boolean;
  readonly showFlashcards: boolean;
  readonly voiceEnabled: boolean;
  readonly romanizationStandard: string;
  readonly voiceName: string;
};

type SettingsContextProps = {
  settings: SettingsState;
  dispatch: React.Dispatch<SettingsAction>;
};

let initialState = {
  showVocalization: true,
  showTranscription: true,
  showFlashcards: false,
  voiceEnabled: false,
  romanizationStandard: 'din',
  voiceName: 'none',
};

const SettingsContext = React.createContext<SettingsContextProps | null>(null);

const reducer = (
  state: SettingsState,
  action: SettingsAction,
): SettingsState => {
  switch (action.type) {
    case C.TOGGLE_VOCALIZATION:
      return { ...state, showVocalization: !state.showVocalization };
    case C.TOGGLE_TRANSCRIPTION:
      return { ...state, showTranscription: !state.showTranscription };
    case C.TOGGLE_FLASHCARDS:
      return { ...state, showFlashcards: !state.showFlashcards };
    case C.TOGGLE_VOICE:
      return { ...state, voiceEnabled: !state.voiceEnabled };
    case C.SET_ROMANIZATION_STANDARD:
      return { ...state, romanizationStandard: action.payload };
    case C.SET_VOICE_NAME:
      return { ...state, voiceName: action.payload };
    default:
      return state;
  }
};

const persistentReducer = (
  state: SettingsState,
  action: SettingsAction,
): SettingsState => {
  const newState = reducer(state, action);
  const {
    showVocalization,
    showTranscription,
    romanizationStandard,
    voiceName,
  } = newState;
  window.localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({
      showVocalization,
      showTranscription,
      romanizationStandard,
      voiceName,
    }),
  );
  return newState;
};

export const SettingsProvider: React.FC = props => {
  const [state, dispatch] = React.useReducer(persistentReducer, initialState);

  return (
    <SettingsContext.Provider value={{ settings: state, dispatch }}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = React.useContext(SettingsContext);
  if (context === null)
    throw new Error('SettingContext: null context is unexpected');
  return context;
};

const stateString = window.localStorage.getItem(LOCAL_STORAGE_KEY);

if (stateString) {
  try {
    initialState = JSON.parse(stateString) as SettingsState;
  } catch (_) {
    window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}
