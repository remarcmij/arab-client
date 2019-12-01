import { ITopic } from 'Types';
import { ActionType, getType } from 'typesafe-actions';
import { logout } from '../auth/actions';
import {
  fetchArticle,
  fetchArticles,
  fetchPublications,
  resetContent,
} from './actions';

type ContentAction = ActionType<typeof import('./actions')>;

type State = Readonly<{
  publications: ITopic[];
  articles: ITopic[];
  article: ITopic | null;
  loading: boolean;
  error?: any;
}>;

const initialState: State = {
  publications: [],
  articles: [],
  article: null,
  loading: true,
};

export default (
  state: State = initialState,
  action: ContentAction | ReturnType<typeof logout>,
): State => {
  switch (action.type) {
    case getType(fetchPublications.request):
    case getType(fetchArticles.request):
    case getType(fetchArticle.request):
      return { ...state, loading: true, error: null };

    case getType(fetchPublications.success):
      return { ...state, publications: action.payload, loading: false };

    case getType(fetchArticles.success):
      return { ...state, articles: action.payload, loading: false };

    case getType(fetchArticle.success):
      return { ...state, article: action.payload, loading: false };

    case getType(fetchPublications.failure):
    case getType(fetchArticles.failure):
    case getType(fetchArticle.failure):
      return { ...state, error: action.payload, loading: false };

    case getType(logout):
    case getType(resetContent):
      return { ...initialState };

    default:
      return state;
  }
};
