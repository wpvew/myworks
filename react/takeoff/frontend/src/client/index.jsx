import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import App from '../App';
import store from '../store/storeRedux'

window.addEventListener('load', () => {
  // ReactDOM.hydrate(<App />, document.getElementById('react-root'));
  ReactDOMClient.hydrateRoot(document.getElementById('react_root'), <App />);
});
