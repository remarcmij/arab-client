import { Lemma } from 'Types';
import { SEARCH_SUCCESS } from '../actions/constants';
import { SearchActions } from '../actions/search';

type State = Readonly<{
  lemmas: Lemma[];
}>;

const initialState: State = {
  lemmas: [],
};

export default (state: State = initialState, action: SearchActions): State => {
  switch (action.type) {
    case SEARCH_SUCCESS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
