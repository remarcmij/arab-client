// tslint:disable no-import-side-effect

import 'core-js/es7/object';
import 'github-markdown-css';
import 'isomorphic-fetch';
import 'normalize.css';
import React from 'react';
import 'react-app-polyfill/ie11';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';
import './services/SpeechSynthesizer';

ReactDOM.render(<App />, document.getElementById('root'));
