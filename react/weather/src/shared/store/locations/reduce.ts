import { Reducer } from 'react';
import {
  TLocationWeatherList,
  TUpdateLocationsDate,
  TUpdateLocationsDateError,
  TUpdateLocationsDateSuccess,
  UPDATE_LOCATIONS_DATA,
  UPDATE_LOCATIONS_DATA_ERROR,
  UPDATE_LOCATIONS_DATA_SUCCESS,
} from './action';

export type TLocationsDataStore = {
  loader: boolean;
  error: string;
  data: TLocationWeatherList;
};

export type LocationsDataActions =
  | TUpdateLocationsDate
  | TUpdateLocationsDateSuccess
  | TUpdateLocationsDateError;
export const LocationsDataStoreReducer: Reducer<TLocationsDataStore, LocationsDataActions> = (
  state,
  action
) => {
  switch (action.type) {
    case UPDATE_LOCATIONS_DATA:
      return {
        ...state,
        loader: true,
        error: '',
      };
    case UPDATE_LOCATIONS_DATA_SUCCESS:
      return {
        ...state,
        loader: false,
        data: action.data,
        // data: [...state.data, ...action.data],
      };
    case UPDATE_LOCATIONS_DATA_ERROR:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    default:
      return state;
  }
};
