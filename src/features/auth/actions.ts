import axios from 'axios';
import i18next from 'i18next';
import {
  createAction,
  createAsyncAction,
  ThunkDispatchAny,
} from 'typesafe-actions';
import { setToast } from '../../layout/actions';
import handleAxiosErrors from '../../utils/handleAxiosErrors';
import { removeToken, storeToken as saveToken } from '../../utils/token';
import { fetchPublicationsThunk } from '../content/actions';

type Credentials = {
  name?: string;
  email: string;
  password: string;
};

type UpdateUser = {
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

export const loadUser = createAsyncAction(
  '@auth/LOAD_USER_REQUEST',
  '@auth/LOAD_USER_SUCCESS',
  '@auth/LOAD_USER_FAILURE',
)<void, User, void>();

export const loadUserThunk = () => async (dispatch: ThunkDispatchAny) => {
  try {
    dispatch(loadUser.request());
    const res = await axios.get('/auth');
    dispatch(loadUser.success(res.data));
    await dispatch(fetchPublicationsThunk());
  } catch (err) {
    dispatch(loadUser.failure());
  }
};

export const registerUser = createAsyncAction(
  '@auth/REGISTER_REQUEST',
  '@auth/REGISTER_SUCCESS',
  '@auth/REGISTER_FAILURE',
)<void, void, void>();

export const registerUserThunk = ({
  name,
  email,
  password,
}: Credentials) => async (dispatch: ThunkDispatchAny) => {
  const body = JSON.stringify({ name, email, password });
  try {
    dispatch(registerUser.request());
    const res = await axios.post('/auth/signup', body);
    saveToken(res.data.token);
    await dispatch(loadUserThunk());
    dispatch(registerUser.success());
  } catch (err) {
    removeToken();
    dispatch(registerUser.failure());
    handleAxiosErrors(err, dispatch);
  }
};

export const localLogin = createAsyncAction(
  '@auth/LOGIN_REQUEST',
  '@auth/LOGIN_SUCCESS',
  '@auth/LOGIN_FAILURE',
)<void, void, void>();

export const resetPasswordRequest = ({ password }: UpdateUser) => async (
  dispatch: ThunkDispatchAny,
) => {
  const body = JSON.stringify({ password });
  const [token] = window.location.pathname.split('/').slice(-1);
  try {
    const res = await axios.post('/auth/password/' + token, body);
    saveToken(res.data.token);
  } catch (err) {
    handleAxiosErrors(err, dispatch);
  }
};

export const localLoginThunk = ({ email, password }: Credentials) => async (
  dispatch: ThunkDispatchAny,
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    dispatch(localLogin.request());
    const res = await axios.post('/auth/login', body, config);
    saveToken(res.data.token);
    await dispatch(loadUserThunk());
    dispatch(localLogin.success());
    dispatch(setToast('success', i18next.t('login_success')));
  } catch (err) {
    handleAxiosErrors(err, dispatch);
    removeToken();
    dispatch(localLogin.failure());
  }
};

export const logout = createAction('@auth/LOGOUT')<void>();

export const logoutThunk = () => async (dispatch: ThunkDispatchAny) => {
  removeToken();
  dispatch(logout());
  await dispatch(loadUserThunk());
};
