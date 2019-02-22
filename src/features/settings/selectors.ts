import Types from 'Types'

export const getShowVocalization = (state: Types.RootState) => state.settings.showVocalization
export const getShowTranscription = (state: Types.RootState) => state.settings.showTranscription
export const getSettings = (state: Types.RootState) => state.settings
