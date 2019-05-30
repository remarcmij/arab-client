import { SET_ALERT, REMOVE_ALERT } from '../actions/constants';
import { AlertType, AlertActions } from '../actions/alert';

type Alert = Readonly<{
  id: string;
  msg: string;
  alertType: AlertType;
}>;

type State = ReadonlyArray<Alert>;

const initialState: State = [];

export default function(
  state: State = initialState,
  action: AlertActions,
): State {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];
    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload.id);
    default:
      return state;
  }
}
