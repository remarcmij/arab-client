import {
  createAction,
  createAsyncAction,
  ThunkDispatchAny,
} from 'typesafe-actions';
import { ITopic } from 'Types';

export interface IVoiceInfo {
  readonly name: string;
  readonly lang: string;
}

export const openSettings = createAction('@settings/OPEN')<void>();

export const closeSettings = createAction('@settings/CLOSE')<void>();

export const toggleVocalization = createAction('@settings/TOGGLE_VOCALIZATION')<
  void
>();

export const setTargetLang = createAction('@settings/SET_TARGET_LANG')<
  string
>();
export const setForeignVoice = createAction('@settings/SET_FOREIGN_VOICE')<{
  lang: string;
  voice: IVoiceInfo;
}>();
export const setNativeVoice = createAction('@settings/SET_NATIVE_VOICE')<{
  lang: string;
  voice: IVoiceInfo;
}>();

export const loadVoices = createAsyncAction(
  '@settings/LOAD_VOICES_REQUEST',
  '@settings/LOAD_VOICES_SUCCESS',
  '@settings/LOAD_VOICES_FAILURE',
)<void, IVoiceInfo[], any>();

export const setPreferredVoices = createAction(
  '@settings/SET_ELIGIBLE_VOICES',
  (voices: IVoiceInfo[]) => voices,
)<IVoiceInfo[]>();

export const setSelectedVoices = createAction(
  '@settings/SET_SELECTED_VOICES',
  (voices: IVoiceInfo[]) => voices,
)<IVoiceInfo[]>();

export const loadVoicesAsync = (topics: ITopic[]) => async (
  dispatch: ThunkDispatchAny,
) => {
  dispatch(loadVoices.request());
  if (!('speechSynthesis' in window)) {
    return void dispatch(
      loadVoices.failure(new Error('Speech synthesis not available')),
    );
  }
  let voices = speechSynthesis.getVoices();
  if (voices.length === 0) {
    voices = await new Promise<SpeechSynthesisVoice[]>(resolve => {
      speechSynthesis.onvoiceschanged = () =>
        resolve(speechSynthesis.getVoices());
    });
  }
  if (voices.length === 0) {
    return void dispatch(loadVoices.failure(new Error('No voices available')));
  }

  const topicLanguages = topics.reduce((set, topic) => {
    set.add(topic.foreignLang);
    set.add(topic.nativeLang);
    return set;
  }, new Set<string>());

  const result = voices
    .filter(voice => topicLanguages.has(voice.lang.slice(0, 2)))
    .map(voice => ({
      name: voice.name,
      lang: voice.lang,
    }));

  dispatch(loadVoices.success(result));
};
