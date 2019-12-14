import { ActionType, getType } from 'typesafe-actions';
import { toggleShuffle, toggleRepeat, toggleSpeech } from './actions';

type FlashcardsAction = ActionType<typeof import('./actions')>;

type State = Readonly<{
  shuffle: boolean;
  speech: boolean;
  repeat: boolean;
}>;

const initialState: State = {
  shuffle: false,
  speech: false,
  repeat: false,
};

export default (
  state: State = initialState,
  action: FlashcardsAction,
): State => {
  switch (action.type) {
    case getType(toggleShuffle):
      return { ...state, shuffle: !state.shuffle };
    case getType(toggleRepeat):
      return { ...state, repeat: !state.repeat };
    case getType(toggleSpeech):
      return { ...state, speech: !state.speech };
    default:
      return state;
  }
};
