import { ActionCreator } from 'redux';
import { TCurrentWeatherData, TForecastWeatherData } from '../../hooks/useWeatherData';

export type TWeatherData = {
  currentWeatherData: TCurrentWeatherData;
  hourlyWeatherData: TForecastWeatherData[];
  weeklyWeatherData: TForecastWeatherData[];
};

export const UPDATE_WEATHER_DATA = 'UPDATE_WEATHER_DATA';
export type TUpdateWeatherDate = {
  type: typeof UPDATE_WEATHER_DATA;
};
export const updateWeatherData: ActionCreator<TUpdateWeatherDate> = () => ({
  type: UPDATE_WEATHER_DATA,
});

export const UPDATE_WEATHER_DATA_SUCCESS = 'UPDATE_WEATHER_DATA_SUCCESS';
export type TUpdateWeatherDateSuccess = {
  type: typeof UPDATE_WEATHER_DATA_SUCCESS;
  data: TWeatherData;
};
export const updateWeatherDataSuccess: ActionCreator<TUpdateWeatherDateSuccess> = (
  data: TWeatherData
) => ({
  type: UPDATE_WEATHER_DATA_SUCCESS,
  data,
});

export const UPDATE_WEATHER_DATA_ERROR = 'UPDATE_WEATHER_DATA_ERROR';
export type TUpdateWeatherDateError = {
  type: typeof UPDATE_WEATHER_DATA_ERROR;
  error: string;
};
export const updateWeatherDataError: ActionCreator<TUpdateWeatherDateError> = (error: string) => ({
  type: UPDATE_WEATHER_DATA_ERROR,
  error,
});
