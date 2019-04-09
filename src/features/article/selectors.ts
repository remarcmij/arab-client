import Types from 'Types';

export const getDocument = (state: Types.RootState) => state.article.document;
export const getIsLoading = (state: Types.RootState) => state.article.isLoading;
export const getError = (state: Types.RootState) => state.article.error;
