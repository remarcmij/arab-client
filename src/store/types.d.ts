/* eslint-disable @typescript-eslint/interface-name-prefix */
import { StateType } from 'typesafe-actions';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

declare module 'typesafe-actions' {
  export type ThunkDispatchAny = ThunkDispatch<{}, {}, AnyAction>;
  export type Store = StateType<typeof import('./index').default>;
  export type RootState = StateType<typeof import('./root-reducer').default>;
}
