import axios from 'axios';
import { action } from 'typesafe-actions';
import handleApiErrors from '../utils/handleApiErrors';
import { removeToken, storeToken as saveToken } from '../utils/token';
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  USER_LOADED,
} from './constants';
import { fetchPublications } from './content';
import { setToast } from './toast';
import { ThunkDispatchAny } from './types';
import i18next from 'i18next';

type Credentials = {
  name?: string;
  email: string;
  password: string;
};

export type User = Readonly<{
  name: string;
  email: string;
  photo: string;
  status: string;
  provider: string;
  verified: boolean;
  isAdmin: boolean;
  created: string;
  lastAccess: string;
}>;

const userLoaded = (user: User) => action(USER_LOADED, user);
const authError = () => action(AUTH_ERROR);

type LoadUserActions = ReturnType<typeof userLoaded | typeof authError>;
// Load user

export const loadUser = () => async (dispatch: ThunkDispatchAny) => {
  try {
    const res = await axios.get('/auth');
    dispatch(userLoaded(res.data));
    await dispatch(fetchPublications());
  } catch (err) {
    dispatch(authError());
  }
};

const registerFail = () => action(REGISTER_FAIL);
type RegisterActions = ReturnType<typeof registerFail>;

/**
 * Register a new user
 */
export const register = ({ name, email, password }: Credentials) => async (
  dispatch: ThunkDispatchAny,
) => {
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/auth/signup', body);
    saveToken(res.data.token);
    await dispatch(loadUser());
  } catch (err) {
    removeToken();
    dispatch(registerFail());
    handleApiErrors(err, dispatch);
  }
};

const loginSuccess = (token: string) => action(LOGIN_SUCCESS, token);
const loginFailure = () => action(LOGIN_FAIL);

type LoginActions = ReturnType<typeof loginSuccess | typeof loginFailure>;

export const localLogin = ({ email, password }: Credentials) => async (
  dispatch: ThunkDispatchAny,
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/auth/login', body, config);
    saveToken(res.data.token);
    await dispatch(loadUser());
    dispatch(setToast('success', i18next.t('login_success')));
  } catch (err) {
    handleApiErrors(err, dispatch);
    removeToken();
    dispatch(loginFailure());
  }
};

const logoutAction = () => action(LOGOUT);

export const logout = () => async (dispatch: ThunkDispatchAny) => {
  removeToken();
  dispatch(logoutAction());
  await dispatch(loadUser());
};

type LogoutActions = ReturnType<typeof logoutAction>;

export type AuthActions =
  | LoadUserActions
  | RegisterActions
  | LoginActions
  | LogoutActions;
