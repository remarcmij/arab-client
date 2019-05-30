import { ThunkAction } from 'redux-thunk';
import { action } from 'typesafe-actions';
import uuid from 'uuid';
import { REMOVE_ALERT, SET_ALERT } from './constants';

export type AlertType = 'success' | 'warn' | 'danger';

const setAlertAction = (msg: string, alertType: AlertType, id: string) =>
  action(SET_ALERT, { msg, alertType, id });

const removeAlertAction = (id: string) => action(REMOVE_ALERT, { id });

export type AlertActions = ReturnType<
  typeof setAlertAction | typeof removeAlertAction
>;

export const setAlert = (
  msg: string,
  alertType: AlertType,
  timeout = 5000,
): ThunkAction<void, void, void, AlertActions> => dispatch => {
  const id = uuid.v4();
  dispatch(setAlertAction(msg, alertType, id));
  setTimeout(() => dispatch(removeAlertAction(id)), timeout);
};
