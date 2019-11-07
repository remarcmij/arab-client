import { action } from 'typesafe-actions';
import { CLEAR_TOAST, SET_TOAST } from './constants';

export type ToastType = 'error' | 'warning' | 'info' | 'success';

export const setToast = (type: ToastType, msg: string) =>
  action(SET_TOAST, { type, msg });

export const clearToast = () => action(CLEAR_TOAST);

export type ToastActions = ReturnType<typeof setToast | typeof clearToast>;
