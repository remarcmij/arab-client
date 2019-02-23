import Types from 'Types'

export const getShowVocalization = (state: Types.RootState) => state.settings.showVocalization
export const getShowTranscription = (state: Types.RootState) => state.settings.showTranscription
export const getRomanization = (state: Types.RootState) => state.settings.romanization
