import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../shared/store/storeRedux';

window.addEventListener('load', () => {
  // console.log('afsgas');
  ReactDOMClient.hydrateRoot(document.getElementById('react_root'), <App />);
});
