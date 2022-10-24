import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TLocationsDataStore } from '../store/locations/reduce';
import { updateLocationsDataAsync } from '../store/locations/thunk';
import { TRootState } from '../store/storeRedux';

export const emptyLocationWeather = {
  location: '',
  region: '',
  temp_c: '',
  temp_f: '',
  condition_name: '',
  condition_icon: '',
};

export type TLocationWeather = typeof emptyLocationWeather;

export const useLocationWeatherData = (locations: Array<string>) => {
  const { data, error, loader } = useSelector<TRootState, TLocationsDataStore>(
    (state) => state.locationsStore
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateLocationsDataAsync(locations));
  }, [locations]);

  return { data, error, loader };
};
