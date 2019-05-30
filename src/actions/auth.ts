import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { action } from 'typesafe-actions';
import handleApiErrors from '../utils/handleApiErrors';
import setAuthToken from '../utils/setAuthToken';
import { getToken } from '../utils/storedToken';
import { setAlert } from './alert';
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
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

export const loadUser = (): ThunkAction<
  void,
  void,
  void,
  any
> => async dispatch => {
  const token = getToken();
  if (token) {
    setAuthToken(token);
  }
  try {
    const res = await axios.get('/auth');
    dispatch(userLoaded(res.data));
  } catch (err) {
    dispatch(authError());
  }
};

const signupSuccess = (token: string) => action(SIGNUP_SUCCESS, token);
const signupFailure = () => action(SIGNUP_FAIL);

type SignupActions = ReturnType<typeof signupSuccess | typeof signupFailure>;

export const signup = ({
  name,
  email,
  password,
}: Credentials): ThunkAction<void, void, void, any> => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/auth/signup', body, config);
    dispatch(signupSuccess(res.data.token));
    dispatch(loadUser());
  } catch (err) {
    handleApiErrors(err, dispatch);
    dispatch(signupFailure());
  }
};

const loginSuccess = (token: string) => action(LOGIN_SUCCESS, token);
const loginFailure = () => action(LOGIN_FAIL);

type LoginActions = ReturnType<typeof loginSuccess | typeof loginFailure>;

export const localLogin = ({
  email,
  password,
}: Credentials): ThunkAction<void, void, void, any> => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/auth/login', body, config);
    dispatch(loginSuccess(res.data.token));
    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      const { errors, message } = err.response.data;
      if (errors) {
        errors.forEach((error: { msg: string }) =>
          dispatch(setAlert(error.msg, 'danger')),
        );
      } else if (message) {
        dispatch(setAlert(message, 'danger'));
      } else {
        dispatch(setAlert('An unknown error occurred.', 'danger'));
      }
    } else if (err.request) {
      dispatch(setAlert('The server did not respond', 'danger'));
    } else {
      dispatch(setAlert('An unknown error occurred.', 'danger'));
    }
    dispatch(loginFailure());
  }
};

const logoutAction = () => action(LOGOUT);

export const logout = (): ThunkAction<void, void, void, any> => dispatch => {
  dispatch(logoutAction());
};

type LogoutActions = ReturnType<typeof logoutAction>;

export type AuthActions =
  | LoadUserActions
  | SignupActions
  | LoginActions
  | LogoutActions;
