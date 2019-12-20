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
  loadVoices,
  VoiceInfo,
  setPreferredVoices,
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
  loading: boolean;
  error: Error | null;
  preferredVoices: VoiceInfo[];
}>;

const initialState: State = {
  showVocalization: true,
  showTranscription: true,
  showFlashcards: false,
  romanizationStandard: 'din',
  foreignVoice: '',
  nativeVoice: '',
  settingsOpen: false,
  loading: false,
  error: null,
  preferredVoices: [],
  ...loadState().settings,
};

const updatePreferredVoices = (
  preferredVoices: VoiceInfo[],
  availableVoices: VoiceInfo[],
) => {
  const currentVoices = preferredVoices.filter(voice =>
    availableVoices.find(v => v.name === voice.name),
  );
  const missingVoices = availableVoices.filter(
    voice => !preferredVoices.find(v => v.name === voice.name),
  );
  return currentVoices.concat(missingVoices);
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
    case getType(loadVoices.request):
      return { ...state, loading: true, error: null };
    case getType(loadVoices.success):
      return {
        ...state,
        preferredVoices:
          action.payload.length === 0
            ? state.preferredVoices
            : updatePreferredVoices(state.preferredVoices, action.payload),
        loading: false,
      };
    case getType(loadVoices.failure):
      return { ...state, loading: false, error: action.payload };
    case getType(setPreferredVoices):
      return { ...state, preferredVoices: action.payload };
    default:
      return state;
  }
};
