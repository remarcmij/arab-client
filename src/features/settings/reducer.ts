import { ActionType, getType } from 'typesafe-actions';
import { loadState } from '../../utils/persistState';
import {
  setTargetLang,
  closeSettings,
  IVoiceInfo,
  loadVoices,
  openSettings,
  toggleVocalization,
  setPreferredVoices,
} from './actions';

type SettingsAction = ActionType<typeof import('./actions')>;

type State = Readonly<{
  showVocalization: boolean;
  settingsOpen: boolean;
  loading: boolean;
  error: Error | null;
  targetLang: string | null;
  preferredVoices: IVoiceInfo[];
}>;

const initialState: State = {
  showVocalization: true,
  settingsOpen: false,
  loading: false,
  error: null,
  targetLang: null,
  preferredVoices: [],
  ...loadState().settings,
};

const updateEligibleVoices = (
  preferredVoices: IVoiceInfo[],
  availableVoices: IVoiceInfo[],
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
    case getType(setTargetLang):
      return { ...state, targetLang: action.payload };
    case getType(toggleVocalization):
      return { ...state, showVocalization: !state.showVocalization };
    case getType(loadVoices.request):
      return { ...state, loading: true, error: null };
    case getType(loadVoices.success):
      return {
        ...state,
        preferredVoices:
          action.payload.length === 0
            ? state.preferredVoices
            : updateEligibleVoices(state.preferredVoices, action.payload),
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
