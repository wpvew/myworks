import { Reducer } from 'react';
import {
  UPDATE_WEATHER_DATA,
  UPDATE_WEATHER_DATA_SUCCESS,
  UPDATE_WEATHER_DATA_ERROR,
  TUpdateWeatherDate,
  TUpdateWeatherDateSuccess,
  TUpdateWeatherDateError,
  TWeatherData,
} from './action';

export type TWeatherDataStore = {
  loader: boolean;
  error: string;
  data: TWeatherData;
};

export type WeatherDataActions =
  | TUpdateWeatherDate
  | TUpdateWeatherDateSuccess
  | TUpdateWeatherDateError;
export const WeatherDataStoreReducer: Reducer<TWeatherDataStore, WeatherDataActions> = (
  state,
  action
) => {
  switch (action.type) {
    case UPDATE_WEATHER_DATA:
      return {
        ...state,
        loader: true,
        error: '',
      };
    case UPDATE_WEATHER_DATA_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.data,
        // data: [...state.data, ...action.data],
      };
    case UPDATE_WEATHER_DATA_ERROR:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    default:
      return state;
  }
};
