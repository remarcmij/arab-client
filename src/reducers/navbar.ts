import { SET_NAV_BACK_ROUTE } from '../actions/constants';
import { NavActions } from '../actions/navbar';

export type State = Readonly<{
  navBackRoute: string | null;
}>;

const initialState: State = {
  navBackRoute: null,
};

export default function(
  state: State = initialState,
  action: NavActions,
): State {
  switch (action.type) {
    case SET_NAV_BACK_ROUTE:
      return { ...state, navBackRoute: action.payload };
    default:
      return state;
  }
}
