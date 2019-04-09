import { Dispatch } from 'redux';
import Types from 'Types';
import { action } from 'typesafe-actions';
import * as C from './constants';

export const fetchStart = () => action(C.FETCH_START);
export const fetchSuccess = (documents: Types.AppDocument[]) => action(C.FETCH_SUCCESS, documents);
export const fetchError = (error: Error) => action(C.FETCH_ERROR, error);
export const clear = () => action(C.CLEAR);

export type ArticlesActions = ReturnType<
  typeof fetchStart | typeof fetchSuccess | typeof fetchError | typeof clear
>;

export const fetchArticleList = (dispatch: Dispatch<ArticlesActions>) => (publication: string) => {
  dispatch(fetchStart());
  fetch(`/api/index/${publication}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      }
      return res;
    })
    .then(res => res.json())
    .then((documents: Types.AppDocument[]) => {
      dispatch(fetchSuccess(documents));
    })
    .catch((error: Error) => {
      dispatch(fetchError(error));
    });
};
