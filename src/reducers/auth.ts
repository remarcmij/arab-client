import { AuthActions, User } from '../actions/auth';
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_FAIL,
  USER_LOADED,
} from '../actions/constants';

export type State = Readonly<{
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
}>;

const initialState: State = {
  isAuthenticated: false,
  loading: true,
  user: null,
};

export default function(
  state: State = initialState,
  action: AuthActions,
): State {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
