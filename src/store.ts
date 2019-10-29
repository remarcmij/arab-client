import throttle from 'lodash.throttle';
import { AnyAction, applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import rootReducer, { RootState } from './reducers';
import { saveState } from './utils/persistState';

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
      settings: {
        showVocalization,
        showTranscription,
        romanizationStandard,
        voiceName,
      },
    } = store.getState();

    saveState({
      showVocalization,
      showTranscription,
      romanizationStandard,
      voiceName,
    });
  }, 1000),
);

export default store;
