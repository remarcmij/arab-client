import { action } from 'typesafe-actions';
import { SET_NAV_BACK_ROUTE } from './constants';

export const setNavBackRoute = (navBackRoute: string) =>
  action(SET_NAV_BACK_ROUTE, navBackRoute);

export type NavActions = ReturnType<typeof setNavBackRoute>;
