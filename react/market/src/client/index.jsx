import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';
import { App } from '../App';

// window.addEventListener('load', () => {
//   ReactDOM.hydrate(<App />, document.getElementById('react-root'));
// });
window.addEventListener('load', () => {
  ReactDOMClient.hydrateRoot(document.getElementById('react-root'), <App />);
});
