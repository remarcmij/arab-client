import throttle from 'lodash.throttle';
import { AnyAction, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer from './root-reducer';
import { saveState } from '../utils/persistState';
import { RootState } from 'typesafe-actions';

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<RootState, AnyAction>),
  ),
);

store.subscribe(
  throttle(() => {
    const {
      settings: { showVocalization, preferredVoices },
      flashcards: { shuffle, repeat },
    } = store.getState();

    saveState({
      settings: {
        showVocalization,
        preferredVoices,
      },
      flashcards: {
        shuffle,
        repeat,
      },
    });
  }, 1000),
);

export default store;
