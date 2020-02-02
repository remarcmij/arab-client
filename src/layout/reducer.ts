import { ActionType, getType } from 'typesafe-actions';
import { clearToast, setNavBackRoute, setToast, ToastType } from './actions';

type Toast = Readonly<{
  type: ToastType;
  msg: string;
  open: boolean;
}>;

export type State = Readonly<{
  navBackRoute?: string;
  toast: Toast;
}>;

const initialState: State = {
  toast: { type: 'info', msg: '', open: false },
};

type LayoutAction = ActionType<typeof import('./actions')>;

const reducer = (state = initialState, action: LayoutAction) => {
  switch (action.type) {
    case getType(setToast):
      return {
        ...state,
        toast: { ...action.payload, open: true },
      };
    case getType(clearToast):
      return {
        ...state,
        toast: { ...state.toast, open: false },
      };
    case getType(setNavBackRoute):
      return { ...state, navBackRoute: action.payload };
    default:
      return state;
  }
};

export default reducer;
