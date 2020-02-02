import { ActionType, getType } from 'typesafe-actions';
import {
  loadUser,
  localLogin,
  logout,
  redirectUser,
  registerUser,
  User,
  secureUser,
} from './actions';

export type State = Readonly<{
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  parentRedirection: string | null;
}>;

type AuthAction = ActionType<typeof import('./actions')>;

const initialState: State = {
  isAuthenticated: false,
  loading: true,
  user: null,
  parentRedirection: null,
};

export default (state = initialState, action: AuthAction): State => {
  switch (action.type) {
    case getType(loadUser.success):
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case getType(redirectUser):
      return {
        ...state,
        parentRedirection: action.payload,
      };
    case getType(registerUser.failure):
    case getType(localLogin.failure):
    case getType(loadUser.failure):
    case getType(logout):
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case getType(secureUser):
      return {
        ...state,
        user: { ...action.payload, isSecured: true },
      };
    default:
      return state;
  }
};
