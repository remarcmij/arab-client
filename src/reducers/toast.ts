import { CLEAR_TOAST, SET_TOAST } from '../actions/constants';
import { ToastActions, ToastType } from '../actions/toast';

type Toast = Readonly<{
  type: ToastType;
  msg: string;
  open: boolean;
}>;

type State = Toast;

const initialState: State = { type: 'info', msg: '', open: false };

export default function(
  state: State = initialState,
  action: ToastActions,
): State {
  switch (action.type) {
    case SET_TOAST:
      return { ...action.payload, open: true };
    case CLEAR_TOAST:
      return { ...state, open: false };
    default:
      return state;
  }
}
