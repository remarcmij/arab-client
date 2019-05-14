// tslint:disable no-import-side-effect

/* Start of IE11 polyfills */
import 'core-js/es7/object';
import 'github-markdown-css';
import 'isomorphic-fetch';
import 'normalize.css';
/* End of IE11 polyfills */
import React from 'react';
import 'react-app-polyfill/ie11';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import './services/SpeechSynthesizer';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
