import { ActionType, getType } from 'typesafe-actions';
import { loadState } from '../../utils/persistState';
import {
  closeSettings,
  openSettings,
  setRomanizationSystem,
  setVoiceName,
  toggleTranscription,
  toggleVocalization,
} from './actions';

type SettingsAction = ActionType<typeof import('./actions')>;

type State = Readonly<{
  showVocalization: boolean;
  showTranscription: boolean;
  showFlashcards: boolean;
  romanizationStandard: string;
  voiceName: string;
  settingsOpen: boolean;
}>;

const initialState: State = {
  showVocalization: true,
  showTranscription: true,
  showFlashcards: false,
  romanizationStandard: 'din',
  voiceName: '',
  settingsOpen: false,
  ...loadState(),
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
    case getType(setVoiceName):
      return { ...state, voiceName: action.payload };
    default:
      return state;
  }
};
