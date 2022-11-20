import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import Routing from './routing/index';
import './App.css';

function App() {
  return <Provider store={store}>{<Routing />}</Provider>;
}

export default App;
