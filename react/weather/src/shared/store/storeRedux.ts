import { Reducer } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { TWeatherDataStore, WeatherDataActions, WeatherDataStoreReducer } from './weather/reducer';
import { emptyCurrentWeatherData } from '../hooks/useWeatherData';
import {
  UPDATE_WEATHER_DATA,
  UPDATE_WEATHER_DATA_ERROR,
  UPDATE_WEATHER_DATA_SUCCESS,
} from './weather/action';
import {
  LocationsDataActions,
  LocationsDataStoreReducer,
  TLocationsDataStore,
} from './locations/reduce';
import {
  UPDATE_LOCATIONS_DATA,
  UPDATE_LOCATIONS_DATA_ERROR,
  UPDATE_LOCATIONS_DATA_SUCCESS,
} from './locations/action';
import {
  ETypeTemp,
  TUpdateTypeTemperature,
  UPDATE_TYPE_TEMPERATURE,
} from './typeTemperature/action';
import { EViewport, TUpdateTypeViewport, UPDATE_TYPE_VIEWPORT } from './viewport/action';

export type TRootState = {
  weatherStore: TWeatherDataStore;
  locationsStore: TLocationsDataStore;
  typeTemp: ETypeTemp;
  viewport: EViewport;
};

const initialState: TRootState = {
  typeTemp: ETypeTemp.celsius,
  viewport: EViewport.unknown,
  weatherStore: {
    loader: false,
    error: '',
    data: {
      currentWeatherData: emptyCurrentWeatherData,
      hourlyWeatherData: [],
      weeklyWeatherData: [],
    },
  },
  locationsStore: {
    loader: false,
    error: '',
    data: {
      locationsData: [],
    },
  },
};

type MyAction =
  | WeatherDataActions
  | LocationsDataActions
  | TUpdateTypeTemperature
  | TUpdateTypeViewport;
export const rootReducer: Reducer<TRootState, MyAction> = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_WEATHER_DATA:
    case UPDATE_WEATHER_DATA_SUCCESS:
    case UPDATE_WEATHER_DATA_ERROR:
      return {
        ...state,
        weatherStore: WeatherDataStoreReducer(state.weatherStore, action),
      };
    case UPDATE_LOCATIONS_DATA:
    case UPDATE_LOCATIONS_DATA_SUCCESS:
    case UPDATE_LOCATIONS_DATA_ERROR:
      return {
        ...state,
        locationsStore: LocationsDataStoreReducer(state.locationsStore, action),
      };
    case UPDATE_TYPE_TEMPERATURE:
      return {
        ...state,
        typeTemp: action.typeTemp,
      };
    case UPDATE_TYPE_VIEWPORT:
      return {
        ...state,
        viewport: action.viewport,
      };

    default:
      return state;
  }
};

const store = configureStore({
  reducer: rootReducer,
});
export default store;
