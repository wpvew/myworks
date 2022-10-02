import * as React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';

window.addEventListener('load', () => {
  const root = ReactDOMClient.createRoot(document.getElementById('react-root'));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
