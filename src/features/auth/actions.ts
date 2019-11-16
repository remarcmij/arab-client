import axios from 'axios';
import i18next from 'i18next';
import { action, ThunkDispatchAny } from 'typesafe-actions';
import { setToast } from '../../layout/actions';
import handleAxiosErrors from '../../utils/handleAxiosErrors';
import { removeToken, storeToken as saveToken } from '../../utils/token';
import { fetchPublications } from '../content/actions';
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  USER_LOADED,
} from './constants';

type Credentials = {
  name?: string;
  email: string;
  password: string;
};

export type User = Readonly<{
  name: string;
  email: string;
  photo?: string;
  provider: string;
  verified: boolean;
  authorized: boolean;
  admin: boolean;
  created: string;
  lastAccess: string;
}>;

export const userLoaded = (user: User) => action(USER_LOADED, user);
export const authError = () => action(AUTH_ERROR);

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

export const registerFail = () => action(REGISTER_FAIL);

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
    handleAxiosErrors(err, dispatch);
  }
};

export const loginSuccess = (token: string) => action(LOGIN_SUCCESS, token);
export const loginFailure = () => action(LOGIN_FAIL);

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
    handleAxiosErrors(err, dispatch);
    removeToken();
    dispatch(loginFailure());
  }
};

export const logoutAction = () => action(LOGOUT);

export const logout = () => async (dispatch: ThunkDispatchAny) => {
  removeToken();
  dispatch(logoutAction());
  await dispatch(loadUser());
};
