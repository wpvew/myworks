import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../store/storeRedux';
import { TWeatherDataStore } from '../store/weather/reducer';
import { updateWeatherDataAsync } from '../store/weather/thunk';

export const useWeatherData = (location = '') => {
  const dispatch = useDispatch();
  const { data, error, loader } = useSelector<TRootState, TWeatherDataStore>(
    (state) => state.weatherStore
  );

  useEffect(() => {
    dispatch(updateWeatherDataAsync(location));
  }, []);

  return { data, loader, error };
};

export const emptyCurrentWeatherData = {
  location: '',
  temp_c: '',
  temp_f: '',
  maxtemp_c: '',
  maxtemp_f: '',
  mintemp_c: '',
  mintemp_f: '',
  condition_icon: '',
  condition_name: '',
  uv: 0,
  visibility: '',
  pressure: '',
  feelslike_c: '',
  feelslike_f: '',
  wind_kph: '',
  wind_dir: '',
  humidity: '',
  precip_mm: '',
  sunset: '',
  sunrise: '',
  region: '',
  weekday: '',
  localtime: '',
  timezone: '',
};

export const emptyForecastWeatherData = {
  isCurrent: false,
  date: '',
  temp_c: 0,
  temp_f: 0,
  condition_icon: '',
  condition_name: '',
};

export type TCurrentWeatherData = typeof emptyCurrentWeatherData;
export type TForecastWeatherData = typeof emptyForecastWeatherData;

export type TResponseCurrent = {
  location: Record<string, string>;
  current: Record<string, any>;
  forecast: Record<
    string,
    Array<{ day: Record<string, any>; astro: Record<string, any>; hour: Array<any> }>
  >;
};

export type TResponseServerForecast = {
  location: { localtime: string };
  forecast: { forecastday: Array<{ date: string; hour: Array<Record<string, any>> }> };
};
