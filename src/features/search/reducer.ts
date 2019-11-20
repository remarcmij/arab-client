import { ILemma } from 'Types';
import { ActionType } from 'typesafe-actions';
import { SEARCH_FAIL, SEARCH_START, SEARCH_SUCCESS } from './constants';

type SearchAction = ActionType<typeof import('./actions')>;

type State = Readonly<{
  lemmas: ILemma[];
  loading: boolean;
  error: Error | null;
}>;

const initialState: State = {
  lemmas: [],
  loading: false,
  error: null,
};

export default (state: State = initialState, action: SearchAction): State => {
  switch (action.type) {
    case SEARCH_START:
      return { ...initialState, loading: true };
    case SEARCH_SUCCESS:
      return { ...state, ...action.payload, loading: false };
    case SEARCH_FAIL:
      return { ...state, ...action.payload, loading: false };
    default:
      return state;
  }
};
