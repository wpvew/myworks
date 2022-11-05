import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Authorization } from '../components/Layout/Authorization';
import { ClientFormContainer } from '../components/ClientFormContainer';
import { Layout } from '../components/Layout';
import { ClientPage } from '../components/Layout/ClientPage';
import { Registration } from '../components/Layout/Registration';
import { useViewport } from '../hooks/useViewport';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUserByToken } from '../store/slices/userSlice';
import { ErrorPage } from '../components/Layout/ErrorPage';

const Routing = () => {
  useViewport();
  const token = useAppSelector<string>((state) => state.userReducer.user.token);
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (localStorage.token) {
      dispatch(fetchUserByToken(localStorage.token)).then(() => {
        setIsMounted(true);
      });
    } else {
      setIsMounted(true);
    }
  }, []);
  return (
    <BrowserRouter>
      {isMounted && (
        <Layout>
          <Routes>
            <Route path='/' element={!token ? <Authorization /> : <Navigate to='/contacts' replace />} />
            <Route path='*' element={<ErrorPage />} />
            <Route path='/auth' element={!token ? <Authorization /> : <Navigate to='/contacts' replace />} />
            <Route path='/reg' element={!token ? <Registration /> : <Navigate to='/contacts' replace />} />
            <Route path='/contacts' element={token ? <ClientPage /> : <Navigate to='/auth' replace />}>
              <Route path=':id' element={<ClientFormContainer />} />
            </Route>
          </Routes>
        </Layout>
      )}
    </BrowserRouter>
  );
};

export default Routing;
