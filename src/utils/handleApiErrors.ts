import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { setAlert } from '../actions/alert';

export default (err: any, dispatch: ThunkDispatch<void, void, AnyAction>) => {
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
};
