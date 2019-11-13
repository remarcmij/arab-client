import { ActionType } from 'typesafe-actions';
import { loadState } from '../../utils/persistState';
import {
  CLOSE_SETTINGS,
  OPEN_SETTINGS,
  SET_ROMANIZATION_STANDARD,
  SET_VOICE_NAME,
  TOGGLE_TRANSCRIPTION,
  TOGGLE_VOCALIZATION,
} from './constants';

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
    case OPEN_SETTINGS:
      return { ...state, settingsOpen: true };
    case CLOSE_SETTINGS:
      return { ...state, settingsOpen: false };
    case TOGGLE_VOCALIZATION:
      return { ...state, showVocalization: !state.showVocalization };
    case TOGGLE_TRANSCRIPTION:
      return { ...state, showTranscription: !state.showTranscription };
    case SET_ROMANIZATION_STANDARD:
      return { ...state, romanizationStandard: action.payload };
    case SET_VOICE_NAME:
      return { ...state, voiceName: action.payload };
    default:
      return state;
  }
};
