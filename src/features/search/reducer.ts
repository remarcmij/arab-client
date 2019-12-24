import { ILemma } from 'Types';
import { ActionType, getType } from 'typesafe-actions';
import { searchLemmas } from './actions';

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
    case getType(searchLemmas.request):
      return { ...initialState, error: null, loading: true };
    case getType(searchLemmas.success):
      return { ...state, lemmas: action.payload, loading: false };
    case getType(searchLemmas.failure):
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
