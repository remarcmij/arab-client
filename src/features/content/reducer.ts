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

type IRegExpSubstitutions = {
  [lang: string]: Array<[RegExp, string]>;
};

type State = Readonly<{
  publications: ITopic[];
  currentPublication?: ITopic;
  substitutions: IRegExpSubstitutions | null;
  articles: ITopic[];
  article: ITopic | null;
  loading: boolean;
  error?: any;
}>;

const initialState: State = {
  publications: [],
  articles: [],
  article: null,
  substitutions: null,
  loading: true,
};

const convertSubstitutions = (topic: ITopic) => {
  const { substitutions, foreignLang, nativeLang } = topic;
  if (typeof substitutions !== 'object') {
    return null;
  }

  const converted: IRegExpSubstitutions = {};
  converted[
    foreignLang
  ] = substitutions.foreign.map(([from, to]: [string, string]) => [
    new RegExp(String.raw`\b${from}\b`, 'gi'),
    to,
  ]);

  converted[
    nativeLang
  ] = substitutions.native.map(([from, to]: [string, string]) => [
    new RegExp(String.raw`\b${from}\b`, 'gi'),
    to,
  ]);

  return converted;
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
        substitutions: convertSubstitutions(currentPublication!),
      };
    }

    case getType(logout):
    case getType(resetContent):
      return { ...initialState };

    default:
      return state;
  }
};
