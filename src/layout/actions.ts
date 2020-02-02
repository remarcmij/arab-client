import { createAction } from 'typesafe-actions';

export type ToastType = 'error' | 'warning' | 'info' | 'success';

export const setToast = createAction(
  '@layout/SET_TOAST',
  (type: ToastType, msg: string) => ({ type, msg }),
)<{ type: ToastType; msg: string }>();

export const clearToast = createAction('@layout/CLEAR_TOAST')();

export const setNavBackRoute = createAction(
  '@layout/SET_NAV_BACK_ROUTE',
  (navBackRoute: string) => navBackRoute,
)<string>();
