import { applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from './root-reducer'
import { composeEnhancers } from './utils'

function configureStore(initialState?: object) {
  // configure middlewares
  const middlewares = [ReduxThunk]
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares))
  // create store
  return createStore(rootReducer, initialState!, enhancer)
}

// pass an optional param to rehydrate state on app start
const store = configureStore()

// export store singleton instance
export default store
