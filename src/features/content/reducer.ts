import { ITopic } from 'Types';
import { ActionType, getType } from 'typesafe-actions';
import { logout } from '../auth/actions';
import {
  fetchArticle,
  fetchArticles,
  fetchPublications,
  setCurrentPublication,
  resetContent,
} from './actions';

type ContentAction = ActionType<typeof import('./actions')>;

type IRegExpFilters = {
  [lang: string]: {
    substitutions: Array<[RegExp, string]>;
    ignores: RegExp[];
  };
};

type State = Readonly<{
  publications: ITopic[];
  currentPublication?: ITopic;
  filters: IRegExpFilters | null;
  articles: ITopic[];
  article: ITopic | null;
  loading: boolean;
  error?: any;
}>;

const initialState: State = {
  publications: [],
  articles: [],
  article: null,
  filters: null,
  loading: true,
};

const createFilters = (topic: ITopic) => {
  if (typeof topic.filters !== 'object') {
    return null;
  }
  const regExpFilters = Object.entries(topic.filters).reduce(
    (acc, [lang, data]) => {
      const { substitutions = [], ignores = [] } = data;
      acc[lang] = {
        substitutions: substitutions.map(([from, to]: [string, string]) => [
          new RegExp(from, 'gi'),
          to,
        ]),
        ignores: ignores.map(ignore => new RegExp(ignore, 'gi')),
      };
      return acc;
    },
    {} as IRegExpFilters,
  );
  return regExpFilters;
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

    case getType(setCurrentPublication): {
      const currentPublication = state.publications.find(
        p => p.publication === action.payload,
      );
      return {
        ...state,
        currentPublication,
        filters: createFilters(currentPublication!),
      };
    }

    case getType(logout):
    case getType(resetContent):
      return { ...initialState };

    default:
      return state;
  }
};
