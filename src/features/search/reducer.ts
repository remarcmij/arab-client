import { ILemma } from 'Types';
import { ActionType } from 'typesafe-actions';
import { SEARCH_SUCCESS } from './constants';

type SearchAction = ActionType<typeof import('./actions')>;

type State = Readonly<{
  lemmas: ILemma[];
}>;

const initialState: State = {
  lemmas: [],
};

export default (state: State = initialState, action: SearchAction): State => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
