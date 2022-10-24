import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TRootState } from '../store/storeRedux';
import { TCurrentWeatherData } from './useWeatherData';

export const useSunPosition = () => {
  const currentWeatherData = useSelector<TRootState, TCurrentWeatherData>(
    (state) => state.weatherStore.data.currentWeatherData
  );
  const [currentMillisec, setCurrentMillisec] = useState(0);
  const [currentMin, setcurrentMin] = useState(0);
  const [sunPosition, setSunPosition] = useState(0);
  const [track, setTrack] = useState(0);

  const sundayMillisec =
    new Date(
      new Date(currentWeatherData.localtime).toLocaleDateString('en') +
        ' ' +
        currentWeatherData.sunset
    ).getTime() -
    new Date(
      new Date(currentWeatherData.localtime).toLocaleDateString('en') +
        ' ' +
        currentWeatherData.sunrise
    ).getTime();
  const sundayMin =
    new Date(sundayMillisec).getHours() * 60 + new Date(sundayMillisec).getMinutes() - 180;

  const degree = +(180 / sundayMin).toFixed(2);

  const rangeMin = 107 * Math.PI * 2;
  const rangeMax = rangeMin / 2;

  const step = rangeMax / sundayMin;

  useEffect(() => {
    setCurrentMillisec(getCurrentMillisec());
    const timer = setInterval(() => {
      setCurrentMillisec(getCurrentMillisec());
    }, 60000);

    function getCurrentMillisec(): number {
      return (
        new Date(new Date(currentWeatherData.localtime).toLocaleString('en')).getTime() -
        new Date(
          new Date(currentWeatherData.localtime).toLocaleDateString('en') +
            ' ' +
            currentWeatherData.sunrise
        ).getTime()
      );
    }
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setcurrentMin(
      new Date(Math.max(0, currentMillisec)).getHours() * 60 +
        new Date(Math.max(0, currentMillisec)).getMinutes() -
        180
    );
  }, [currentMillisec]);

  useEffect(() => {
    setSunPosition(Math.min(180, currentMin * degree));
    setTrack(Math.max(rangeMax, rangeMin - currentMin * step));
  }, [currentMin]);

  return [sunPosition, track];
};
