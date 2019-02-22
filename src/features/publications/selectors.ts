import { PublicationsState } from './reducer'
import Types from 'Types'

export const getDocuments = (state: Types.RootState) => state.publications.documents
export const getIsLoading = (state: Types.RootState) => state.publications.isLoading
export const getError = (state: Types.RootState) => state.publications.error
