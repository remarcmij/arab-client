import Types from 'Types';

export const getShowVocalization = (state: Types.RootState) => state.settings.showVocalization;
export const getShowTranscription = (state: Types.RootState) => state.settings.showTranscription;
export const getShowFlashcards = (state: Types.RootState) => state.settings.showFlashcards;
export const getRomanization = (state: Types.RootState) => state.settings.romanizationStandard;
export const getVoiceEnabled = (state: Types.RootState) => state.settings.voiceEnabled;
export const getVoiceName = (state: Types.RootState) => state.settings.voiceName;
