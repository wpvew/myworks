import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Routing from './shared/routing/Routing';
import store from './shared/store/storeRedux';
import './shared/styles/style.scss';
import './shared/styles/libs.scss';

export const AppComponent = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return <Provider store={store}>{isMounted && <Routing />}</Provider>;
};

const App = () => <AppComponent />;

export default App;
