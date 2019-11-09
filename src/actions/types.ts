import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
export type ThunkDispatchAny = ThunkDispatch<{}, {}, AnyAction>;
