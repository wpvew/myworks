import React from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom'
import { FilmList } from './components/FilmList';
import styles from './App.module.css'
import { FilmItemPage } from './components/FilmItemPage';
import { FilmContextProveder } from './context/filmContext';

function App() {
  
  return (
    <FilmContextProveder>
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<FilmList/>} />
            <Route path='/:id' element={<FilmItemPage/>} />
        </Routes>
      </BrowserRouter>
    </FilmContextProveder>
  );
}

export default App;
