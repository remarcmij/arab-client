import { applyMiddleware, createStore } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from './root-reducer'
import { composeEnhancers } from './utils'

const AJAR_STORE = '@ajar/store'

function configureStore(initialState?: object) {
  // configure middlewares
  const middlewares = [ReduxThunk]
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares))
  // create store
  return createStore(rootReducer, initialState!, enhancer)
}

// pass an optional param to rehydrate state on app start
const settings = localStorage[AJAR_STORE] ? JSON.parse(localStorage[AJAR_STORE]) : undefined
const store = configureStore({ settings })

store.subscribe(() => {
  localStorage[AJAR_STORE] = JSON.stringify(store.getState().settings)
})

// export store singleton instance
export default store
