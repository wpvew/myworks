import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { updateTypeTemperature } from './shared/store/typeTemperature/action';
import { ApiServer } from './shared/API/ApiServer';
import { EViewport } from './shared/store/viewport/action';
import { Locations } from './shared/pages/Locations';
import { Weather } from './shared/pages/Weather';
import store, { TRootState } from './shared/store/storeRedux';
import './shared/styles/style.scss';
import './shared/styles/swiper.scss';

const AppWrap = () => {
  const [isMounted, setIsMounted] = useState(false);
  const viewport = useSelector<TRootState, EViewport>((state) => state.viewport);
  const dispatch = useDispatch();

  useEffect(() => {
    ApiServer.getGeolocation().then(({ data }) => {
      localStorage.setItem('location', data['city']);
      setIsMounted(true);
    });

    if (localStorage.typeTemp) {
      dispatch(updateTypeTemperature(localStorage.typeTemp));
    }
  }, []);

  return (
    <>
      {isMounted && (
        <BrowserRouter>
          <Routes>
            <Route path='/weather/:location' element={<Weather />} />
            <Route
              path='/locations'
              element={
                viewport !== EViewport.desktop ? (
                  <Locations />
                ) : (
                  <Navigate to={`/`} replace={true} />
                )
              }
            />
            <Route
              path='/'
              element={<Navigate to={`weather/${localStorage.location}`} replace />}
            />
            <Route path='/weather' element={<Navigate to={`/`} replace />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
};
function AppComponent() {
  return (
    <Provider store={store}>
      <AppWrap />
    </Provider>
  );
}

export const App = hot(() => AppComponent());
