import {
  SET_ROMANIZATION_STANDARD,
  SET_VOICE_NAME,
  TOGGLE_TRANSCRIPTION,
  TOGGLE_VOCALIZATION,
} from '../actions/constants';
import { SettingsActions } from '../actions/settings';
import { loadState } from '../utils/persistState';

type State = Readonly<{
  showVocalization: boolean;
  showTranscription: boolean;
  showFlashcards: boolean;
  romanizationStandard: string;
  voiceName: string;
}>;

const initialState: State = {
  showVocalization: true,
  showTranscription: true,
  showFlashcards: false,
  romanizationStandard: 'din',
  voiceName: '',
  ...loadState(),
};

export default (
  state: State = initialState,
  action: SettingsActions,
): State => {
  switch (action.type) {
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
