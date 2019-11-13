import { ActionType } from 'typesafe-actions';
import { ToastType } from './actions';
import { CLEAR_TOAST, SET_NAV_BACK_ROUTE, SET_TOAST } from './constants';

type Toast = Readonly<{
  type: ToastType;
  msg: string;
  open: boolean;
}>;

export type State = Readonly<{
  navBackRoute: string | null;
  toast: Toast;
}>;

const initialState: State = {
  navBackRoute: null,
  toast: { type: 'info', msg: '', open: false },
};

type LayoutAction = ActionType<typeof import('./actions')>;

export default function(
  state: State = initialState,
  action: LayoutAction,
): State {
  switch (action.type) {
    case SET_TOAST:
      return { ...state, toast: { ...state.toast, open: true } };
    case CLEAR_TOAST:
      return { ...state, toast: { ...state.toast, open: false } };
    case SET_NAV_BACK_ROUTE:
      return { ...state, navBackRoute: action.payload };
    default:
      return state;
  }
}
