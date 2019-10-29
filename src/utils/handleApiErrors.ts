import { setAlert, AlertType } from '../actions/alert';
import { ThunkDispatchAny } from '../actions/types';

export default (err: any, dispatch: ThunkDispatchAny) => {
  if (err.response) {
    const { errors, message } = err.response.data;

    if (errors) {
      return void errors.forEach((error: { msg: string }) =>
        dispatch(setAlert(error.msg, AlertType.Danger)),
      );
    }

    if (message) {
      return void dispatch(setAlert(message, AlertType.Danger));
    }

    return void dispatch(
      setAlert('An unknown error occurred.', AlertType.Danger),
    );
  }

  if (err.request) {
    return void dispatch(
      setAlert('The server did not respond', AlertType.Danger),
    );
  }

  dispatch(setAlert('An unknown error occurred.', AlertType.Danger));
};
