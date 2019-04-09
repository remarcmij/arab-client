import { Reducer } from 'redux';
import Types from 'Types';
import { ActionType } from 'typesafe-actions';
import * as article from './actions';
import * as C from './constants';

export type ArticleAction = ActionType<typeof article>;

export type ArticleState = {
  readonly document: Types.AppDocument | null
  readonly isLoading: boolean
  readonly error: Error | null
};

const initialState: ArticleState = {
  document: null,
  isLoading: false,
  error: null,
};

const reducer: Reducer<ArticleState, ArticleAction> = (state = initialState, action) => {
  switch (action.type) {
    case C.FETCH_START:
      return { ...state, isLoading: true, error: null, document: null };
    case C.FETCH_SUCCESS:
      return { ...state, isLoading: false, document: action.payload };
    case C.FETCH_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case C.CLEAR_ARTICLE:
      return { isLoading: false, error: null, document: null };
    default:
      return state;
  }
};

export default reducer;
