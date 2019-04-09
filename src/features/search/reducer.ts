import { Reducer } from 'redux';
import Types from 'Types';
import { ActionType } from 'typesafe-actions';
import * as search from './actions';
import * as C from './constants';

export type SearchAction = ActionType<typeof search>;

export type SearchState = {
  readonly lemmas: Types.DictEntry[] | null;
  readonly isLoading: boolean;
  readonly error: Error | null;
  readonly id: string;
};

const initialState: SearchState = {
  lemmas: null,
  isLoading: false,
  error: null,
  id: '',
};

const reducer: Reducer<SearchState, SearchAction> = (state = initialState, action) => {
  switch (action.type) {
    case C.FETCH_START:
      return { ...state, isLoading: true, error: null, lemmas: null, id: action.payload };
    case C.FETCH_SUCCESS:
      return { ...state, isLoading: false, lemmas: action.payload };
    case C.FETCH_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case C.CLEAR_SEARCH:
      return { ...initialState };
    default:
      return state;
  }
};

export default reducer;
