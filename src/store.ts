import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { saveState } from './utils/persistState';
import throttle from 'lodash.throttle';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
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
