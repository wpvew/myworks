import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Header from './layouts/Header/Header';
import { CardsList } from './pages/Content/CardsList';
import { Content } from './pages/Content';
import { Layout } from './shared/Layout';
import { Post } from './layouts/Post';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './main.global.css';

//---REDUX------REDUX------REDUX------REDUX------REDUX------REDUX------REDUX------REDUX------REDUX------REDUX---//
import { applyMiddleware, createStore } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './store/storeRedux';
import { ErrorPage } from './pages/ErrorPage';
import { saveToken } from './store/token/action';
import thunk from 'redux-thunk';
import Routing from './router/Routing';
import { fetchToken } from './newStore/slice/tokenSlice';
import { useAppSelector } from './newStore/hooks';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
// const store = createStore();
////////////////////////////////////////////////////////////////////////////////////////////////////////

function AppWrap() {
  const dispatch = useDispatch();
  // const token = useAppSelector((state) => state);
  // console.log(token);

  useEffect(() => {
    dispatch(saveToken());
    dispatch(fetchToken(localStorage.token));
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Content>
          <Routing />
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

function AppComponent() {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return <Provider store={store}>{isMounted && <AppWrap />}</Provider>;
}

const App = hot(() => <AppComponent />);
export default App;
