import {
  FETCH_START,
  FETCH_PUBLICATIONS_SUCCESS,
  FETCH_ARTICLES_SUCCESS,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ERROR,
  LOGOUT,
} from '../actions/constants';
import { ContentActions } from '../actions/content';
import { AuthActions } from '../actions/auth';

import { Topic } from 'Types';

type State = Readonly<{
  publications: Topic[];
  articles: Topic[];
  article: Topic | null;
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
  action: ContentActions | AuthActions,
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
      return { ...initialState };
    default:
      return state;
  }
};
