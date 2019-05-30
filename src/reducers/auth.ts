import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
} from '../actions/constants';
import { AuthActions, User } from '../actions/auth';
import { storeToken, removeToken, getToken } from '../utils/storedToken';

export type State = Readonly<{
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
}>;

const initialState: State = {
  token: getToken(),
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
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      storeToken(action.payload);
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case SIGNUP_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      removeToken();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
