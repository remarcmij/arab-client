import { applyMiddleware, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './root-reducer';
import { composeEnhancers } from './utils';

const STORE_NAME = '@arab/store';

function configureStore(initialState?: object) {
  // configure middlewares
  const middlewares = [ReduxThunk];
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares));
  // create store
  return createStore(rootReducer, initialState!, enhancer);
}

// pass an optional param to rehydrate state on app start
const settings = localStorage[STORE_NAME] ? JSON.parse(localStorage[STORE_NAME]) : undefined;
const store = configureStore({ settings });

store.subscribe(() => {
  localStorage[STORE_NAME] = JSON.stringify(store.getState().settings);
});

// export store singleton instance
export default store;
