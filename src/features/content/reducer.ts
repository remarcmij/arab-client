import { ITopic } from 'Types';
import { ActionType } from 'typesafe-actions';
import { LOGOUT } from '../auth/constants';
import {
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ERROR,
  FETCH_PUBLICATIONS_SUCCESS,
  FETCH_START,
  RESET,
} from './constants';

type AuthAction = ActionType<typeof import('../auth/actions')>;
type ContentAction = ActionType<typeof import('./actions')>;

type State = Readonly<{
  publications: ITopic[];
  articles: ITopic[];
  article: ITopic | null;
  loading: boolean;
  error: any;
}>;

const initialState: State = {
  publications: [],
  articles: [],
  article: null,
  loading: true,
  error: null,
};

export default (
  state: State = initialState,
  action: ContentAction | AuthAction,
): State => {
  switch (action.type) {
    case FETCH_START:
      return { ...state, loading: true, error: null };
    case FETCH_PUBLICATIONS_SUCCESS:
      return { ...state, publications: action.payload, loading: false };
    case FETCH_ARTICLES_SUCCESS:
      return { ...state, articles: action.payload, loading: false };
    case FETCH_ARTICLE_SUCCESS:
      return { ...state, article: action.payload, loading: false };
    case FETCH_ERROR:
      return { ...state, error: action.payload, loading: false };
    case LOGOUT:
    case RESET:
      return { ...initialState };
    default:
      return state;
  }
};
