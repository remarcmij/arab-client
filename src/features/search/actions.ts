import axios from 'axios';
import { ILemma } from 'Types';
import { action, ThunkDispatchAny } from 'typesafe-actions';
import handleAxiosErrors from '../../utils/handleAxiosErrors';
import { SEARCH_FAIL, SEARCH_START, SEARCH_SUCCESS } from './constants';

export const searchStart = () => action(SEARCH_START);
export const searchSuccess = (lemmas: ILemma[]) =>
  action(SEARCH_SUCCESS, { lemmas });
export const searchFail = (error: Error) => action(SEARCH_FAIL, { error });

export const searchLemmas = (term: string) => async (
  dispatch: ThunkDispatchAny,
) => {
  try {
    dispatch(searchStart());
    const res = await axios(`/api/search?term=${term}`);
    dispatch(searchSuccess(res.data));
  } catch (err) {
    dispatch(searchFail(err));
    handleAxiosErrors(err, dispatch);
  }
};

export type SearchActions = ReturnType<typeof searchSuccess>;
