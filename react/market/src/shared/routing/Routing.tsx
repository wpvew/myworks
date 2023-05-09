import React, { CSSProperties, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchEmployeeByToken } from '../store/slice/emplyeeSlice';
import { Auth } from '../pages/Auth';
import { Register } from '../pages/Register';
import { Home } from '../pages/Home';
import { Dashboard } from '../pages/Dashboard';
import { Employeers } from '../pages/Employeers';
import { Product } from '../pages/Product';
import { ProductCard } from '../pages/Product/ProductCard';
import { Warehouse } from '../pages/Warehouse';
import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';
import { CreateEmployeer } from '../pages/Employeers/CreateEmployeer';

export const Routing = () => {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.emplyeeSliceReducer.employee.token);

  useEffect(() => {
    if (localStorage.token) {
      dispatch(fetchEmployeeByToken(localStorage.token)).then(() => {
        setIsMounted(true);
      });
    } else {
      setIsMounted(true);
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {isMounted && (
        <BrowserRouter>
          <Header />
          {/* <main
            style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(180deg, rgba(91,91,91,0) 0%, rgba(240,244,255,1) 100%)',
            }}
          > */}
          {/* <Nav */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/employeers' element={<Employeers />} />
            <Route path='/employeers/create' element={<CreateEmployeer />} />
            <Route path='/products' element={<Product />} />
            <Route path='/warehouse' element={<Warehouse />} />
            <Route path='/product-card' element={<ProductCard />} />
            <Route path='/product-card/:id' element={<ProductCard />} />
            <Route
              path='/login'
              element={token ? <Navigate to='/dashboard' replace /> : <Auth />}
            />
            <Route path='/company' element={<Register />} />
            <Route
              path='/dashboard'
              element={token ? <Dashboard /> : <Navigate to='/' replace />}
            />
          </Routes>
          {/* </main> */}
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
};
