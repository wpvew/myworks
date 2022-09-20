import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import Header from './shared/Header/Header';
import { CardsList } from './shared/Content/CardsList';
import { Content } from './shared/Content';
import { Layout } from './shared/Layout';
import { Post } from './shared/Post';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './main.global.css';

//---REDUX------REDUX------REDUX------REDUX------REDUX------REDUX------REDUX------REDUX------REDUX------REDUX---//
import { applyMiddleware, createStore } from 'redux';
import { Provider, useDispatch } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './store/storeRedux';
import { ErrorPage } from './shared/ErrorPage';
import { saveToken } from './store/token/action';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
////////////////////////////////////////////////////////////////////////////////////////////////////////

function AppWrap() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(saveToken());
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Header />
        <Content>
          <Routes>
            <Route path='/posts' element={<CardsList />} />
            <Route
              path='/posts/:id'
              element={
                <>
                  <CardsList />
                  <Post />
                </>
              }
            />
            <Route path='/error404' element={<ErrorPage />} />
            <Route path='/auth' element={<Navigate to='/posts' replace />} />
            <Route path='/' element={<Navigate to='/posts' replace />} />
            <Route path='*' element={<Navigate to='/error404' replace />} />
          </Routes>
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
