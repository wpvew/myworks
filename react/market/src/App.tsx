import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { Routing } from './shared/routing/Routing';
import store from './shared/store';
import './shared/styles/style.scss';

export const App = () => {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  );
};

// export const App = hot(() => <AppComponent />);
