import axios from 'axios';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { Lemma } from 'Types';
import { action } from 'typesafe-actions';
import handleApiErrors from '../utils/handleApiErrors';
import { SEARCH_SUCCESS } from './constants';

export const searchSuccess = (lemmas: Lemma[]) =>
  action(SEARCH_SUCCESS, { lemmas });

export const searchLemmas = (
  term: string,
): ThunkAction<void, void, void, AnyAction> => async dispatch => {
  try {
    const res = await axios(`/api/search?term=${term}`);
    dispatch(searchSuccess(res.data));
  } catch (err) {
    handleApiErrors(err, dispatch);
  }
};

export type SearchActions = ReturnType<typeof searchSuccess>;
