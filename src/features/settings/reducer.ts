import { ActionType, getType } from 'typesafe-actions';
import { loadState } from '../../utils/persistState';
import {
  closeSettings,
  openSettings,
  setRomanizationSystem,
  setForeignVoice,
  setNativeVoice,
  toggleTranscription,
  toggleVocalization,
} from './actions';

type SettingsAction = ActionType<typeof import('./actions')>;

type State = Readonly<{
  showVocalization: boolean;
  showTranscription: boolean;
  showFlashcards: boolean;
  romanizationStandard: string;
  foreignVoice: string;
  nativeVoice: string;
  settingsOpen: boolean;
}>;

const initialState: State = {
  showVocalization: true,
  showTranscription: true,
  showFlashcards: false,
  romanizationStandard: 'din',
  foreignVoice: '',
  nativeVoice: '',
  settingsOpen: false,
  ...loadState().settings,
};

export default (state: State = initialState, action: SettingsAction): State => {
  switch (action.type) {
    case getType(openSettings):
      return { ...state, settingsOpen: true };
    case getType(closeSettings):
      return { ...state, settingsOpen: false };
    case getType(toggleVocalization):
      return { ...state, showVocalization: !state.showVocalization };
    case getType(toggleTranscription):
      return { ...state, showTranscription: !state.showTranscription };
    case getType(setRomanizationSystem):
      return { ...state, romanizationStandard: action.payload };
    case getType(setForeignVoice):
      return { ...state, foreignVoice: action.payload };
    case getType(setNativeVoice):
      return { ...state, nativeVoice: action.payload };
    default:
      return state;
  }
};
