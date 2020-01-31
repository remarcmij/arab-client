import 'github-markdown-css';
import 'normalize.css';
import React from 'react';
import 'react-app-polyfill/ie11';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './i18n';
import './index.css';
import './services/SpeechSynthesizer';
import store from './store';
import './utils/axiosDefaults';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
