import axios from 'axios';
import { ILemma } from 'Types';
import { createAsyncAction, ThunkDispatchAny } from 'typesafe-actions';
import handleAxiosErrors from '../../utils/handleAxiosErrors';

export const searchLemmas = createAsyncAction(
  '@auth/SEARCH_LEMMAS_REQUEST',
  '@auth/SEARCH_LEMMAS_SUCCESS',
  '@auth/SEARCH_LEMMAS_FAILURE',
)<void, ILemma[], any>();

export const searchLemmasAsync = (term: string) => async (
  dispatch: ThunkDispatchAny,
) => {
  try {
    dispatch(searchLemmas.request());
    const res = await axios(`/api/search?term=${term}`);
    dispatch(searchLemmas.success(res.data));
  } catch (err) {
    dispatch(searchLemmas.failure(err));
    handleAxiosErrors(err, dispatch);
  }
};
