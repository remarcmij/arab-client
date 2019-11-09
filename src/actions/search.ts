import axios from 'axios';
import { ILemma } from 'Types';
import { action } from 'typesafe-actions';
import handleAxiosErrors from '../utils/handleAxiosErrors';
import { SEARCH_SUCCESS } from './constants';
import { ThunkDispatchAny } from './types';

export const searchSuccess = (lemmas: ILemma[]) =>
  action(SEARCH_SUCCESS, { lemmas });

export const searchLemmas = (term: string) => async (
  dispatch: ThunkDispatchAny,
) => {
  try {
    const res = await axios(`/api/search?term=${term}`);
    dispatch(searchSuccess(res.data));
  } catch (err) {
    handleAxiosErrors(err, dispatch);
  }
};

export type SearchActions = ReturnType<typeof searchSuccess>;
