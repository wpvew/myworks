import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Blood from '../pages/tables/supplies/Blood/Blood';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='/mpe1gem' element={<Blood />}>
          <Route path=':id' element={<Blood />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
