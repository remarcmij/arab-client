// tslint:disable no-import-side-effect

/* Start of IE11 polyfills */
import 'react-app-polyfill/ie11'
import 'core-js/es7/object'
/* End of IE11 polyfills */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'

import 'normalize.css'
import './index.css'
import 'github-markdown-css'
import 'isomorphic-fetch'
import './services/SpeechSynthesizer'
import * as serviceWorker from './serviceWorker'

import store from './store'

const Root = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(Root, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
