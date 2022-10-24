import { ActionCreator } from 'redux';
import { TLocationWeather } from '../../hooks/useLocationWeatherData';

export type TLocationWeatherList = {
  locationsData: TLocationWeather[];
};

export const UPDATE_LOCATIONS_DATA = 'UPDATE_LOCATIONS_DATA';
export type TUpdateLocationsDate = {
  type: typeof UPDATE_LOCATIONS_DATA;
};
export const updateLocationsData: ActionCreator<TUpdateLocationsDate> = () => ({
  type: UPDATE_LOCATIONS_DATA,
});

export const UPDATE_LOCATIONS_DATA_SUCCESS = 'UPDATE_LOCATIONS_DATA_SUCCESS';
export type TUpdateLocationsDateSuccess = {
  type: typeof UPDATE_LOCATIONS_DATA_SUCCESS;
  data: TLocationWeatherList;
};
export const updateLocationsDataSuccess: ActionCreator<TUpdateLocationsDateSuccess> = (
  data: TLocationWeatherList
) => ({
  type: UPDATE_LOCATIONS_DATA_SUCCESS,
  data,
});

export const UPDATE_LOCATIONS_DATA_ERROR = 'UPDATE_LOCATIONS_DATA_ERROR';
export type TUpdateLocationsDateError = {
  type: typeof UPDATE_LOCATIONS_DATA_ERROR;
  error: string;
};
export const updateLocationsDataError: ActionCreator<TUpdateLocationsDateError> = (
  error: string
) => ({
  type: UPDATE_LOCATIONS_DATA_ERROR,
  error,
});
