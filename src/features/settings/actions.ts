import {
  createAction,
  createAsyncAction,
  ThunkDispatchAny,
} from 'typesafe-actions';
import { ITopic } from 'Types';

export type VoiceInfo = {
  name: string;
  lang: string;
};

export const openSettings = createAction('@settings/OPEN')<void>();

export const closeSettings = createAction('@settings/CLOSE')<void>();

export const toggleVocalization = createAction('@settings/TOGGLE_VOCALIZATION')<
  void
>();

export const toggleTranscription = createAction(
  '@settings/TOGGLE_TRANSCRIPTION',
)<void>();

export const setRomanizationSystem = createAction(
  '@settings/SET_ROMANIZATION_STANDARD',
  (romanizationStandard: string) => romanizationStandard,
)<string>();

export const setForeignVoice = createAction(
  '@settings/SET_FOREIGN_VOICE',
  (voiceName: string) => voiceName,
)<string>();

export const setNativeVoice = createAction(
  '@settings/SET_NATIVE_VOICE',
  (voiceName: string) => voiceName,
)<string>();

export const loadVoices = createAsyncAction(
  '@settings/LOAD_VOICES_REQUEST',
  '@settings/LOAD_VOICES_SUCCESS',
  '@settings/LOAD_VOICES_FAILURE',
)<void, VoiceInfo[], any>();

export const setPreferredVoices = createAction(
  '@setting/SET_PREFERRED_VOICES',
  (voices: VoiceInfo[]) => voices,
)<VoiceInfo[]>();

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
