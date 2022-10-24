import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { ApiServer } from '../../API/ApiServer';
import { TLocationWeather } from '../../hooks/useLocationWeatherData';
import {
  updateLocationsData,
  updateLocationsDataError,
  updateLocationsDataSuccess,
} from './action';

export const updateLocationsDataAsync =
  (locations: Array<string>): ThunkAction<void, RootStateOrAny, unknown, Action<any>> =>
  (dispatch) => {
    dispatch(updateLocationsData());
    function createArrayLocations(data: Array<Record<string, any>>): Array<TLocationWeather> {
      return data.map((item: Record<string, any>): TLocationWeather => {
        return {
          location: item.data.location.name,
          region: item.data.location.country,
          temp_c: Math.round(item.data.current.temp_c) + ' °С',
          temp_f: Math.round(item.data.current.temp_f) + ' °F',
          condition_name: item.data.current.condition.text,
          condition_icon: 'https:' + item.data.current.condition.icon,
        };
      });
    }
    Promise.all([...locations].map((location) => ApiServer.getLocationsWeather(location)))
      .then((data) => {
        dispatch(
          updateLocationsDataSuccess({
            locationsData: createArrayLocations(data),
          })
        );
      })
      .catch((err) => {
        dispatch(updateLocationsDataError(err.response.data.error.message));
      });
  };
