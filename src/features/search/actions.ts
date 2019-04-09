import { Dispatch } from 'redux';
import Types from 'Types';
import { action } from 'typesafe-actions';
import * as C from './constants';
import uuidv4 from 'uuid/v4';

export const fetchStart = (id: string) => action(C.FETCH_START, id);
export const fetchSuccess = (lemmas: Types.DictEntry[]) => action(C.FETCH_SUCCESS, lemmas);
export const fetchError = (error: Error) => action(C.FETCH_ERROR, error);
export const clear = () => action(C.CLEAR_SEARCH);

export type SearchActions = ReturnType<
  typeof fetchStart | typeof fetchSuccess | typeof fetchError | typeof clear
>;

type SearchResult = {
  lemmas: Types.DictEntry[];
  id: string;
};

export const fetchLemmas = (dispatch: Dispatch<SearchActions>) => (term: string) => {
  const id = uuidv4();
  dispatch(fetchStart(id));
  fetch(`/api/dict?term=${term}&id=${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} - ${res.statusText}`);
      }
      return res;
    })
    .then(res => res.json())
    .then(({ lemmas, id }: SearchResult) => {
      dispatch(fetchSuccess(lemmas));
    })
    .catch((error: Error) => {
      dispatch(fetchError(error));
    });
};
