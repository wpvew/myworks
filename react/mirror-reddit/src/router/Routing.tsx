import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CardsList } from '../pages/Content/CardsList';
import { ErrorPage } from '../pages/ErrorPage';
import { Post } from '../layouts/Post';

const Routing = () => {
  return (
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
  );
};

export default Routing;
