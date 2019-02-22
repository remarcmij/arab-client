import Types from 'Types'

export const getDocuments = (state: Types.RootState) => state.articles.documents
export const getIsLoading = (state: Types.RootState) => state.articles.isLoading
export const getError = (state: Types.RootState) => state.articles.error
