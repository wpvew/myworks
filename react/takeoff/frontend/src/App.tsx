import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { Layout } from './shared/components/Layout';
import { Content } from './shared/components/Layout/Content';
import { Header } from './shared/components/Layout/Header';
import store, { TRootState } from './store/storeRedux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ClientList } from './shared/components/Layout/Content/ClientList';
import { useSelector } from 'react-redux';
import { Authorization } from './shared/components/Authorization';
import { setToken } from './store/token/action';
import { ManagementClientContainer } from './shared/components/ManagementClientContainer';

const AppWrap = () => {
  const token = useSelector<TRootState, string>(state => state.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.token) {
      dispatch(setToken(localStorage.token));
    }
  }, []);

  return (
    <BrowserRouter>
      <Layout>
        <Header/>
        <Content>
          <Routes>
            <Route path='/auth' element={!token ? <Authorization /> : <Navigate to='/contacts' replace />} />
            <Route path='/contacts' element={token ? <ClientList /> : <Navigate to='/auth' replace /> } />
            <Route
              path='/contacts/:id'
              element={
                token
                  ? <>
                      <ClientList />
                      <ManagementClientContainer/>
                    </>
                  : <Navigate to='/auth' replace />
              }
            />
          </Routes>
        </Content>
      </Layout>
    </BrowserRouter>
  )
}

const AppComponent = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <Provider store={store}>
      {isMounted &&<AppWrap/>}
    </Provider>
  )
};

export const App = (() => <AppComponent/>);
export default App
