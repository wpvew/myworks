import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TRootState } from '../../../store/storeRedux';
import { TWeatherData } from '../../../store/weather/action';
import { generateId } from '../../../utils/generateRandomIndex';
import { Forecast } from './Forecast';
import { Widgets } from './Widgets';
import { Control } from './Control';
import styles from '../../../styles/modal.scss';

export enum EForecasts {
  hourly = 'hourly',
  weekly = 'weekly',
}

export function Modal() {
  const { hourlyWeatherData, weeklyWeatherData } = useSelector<TRootState, TWeatherData>(
    (state) => state.weatherStore.data
  );
  const hourlyWeatherDataWithKey = hourlyWeatherData.map(generateId);
  const weeklyWeatherDataWithKey = weeklyWeatherData.map(generateId);

  const [forecastData, setForecastData] = useState(hourlyWeatherDataWithKey);
  const [isMounted, setIsMounted] = useState(false);
  const [forecastType, setForecastType] = useState(EForecasts.hourly);

  useEffect(() => {
    if (!isMounted && hourlyWeatherData.length) {
      setForecastData(hourlyWeatherDataWithKey);
      setIsMounted(true);
    }
  }, [hourlyWeatherData]);

  const handleChangeForecastToHourly = () => {
    setForecastData(hourlyWeatherDataWithKey);
    setForecastType(EForecasts.hourly);
  };
  const handleChangeForecastToWeekly = () => {
    setForecastData(weeklyWeatherDataWithKey);
    setForecastType(EForecasts.weekly);
  };

  return (
    <div className={styles.modal}>
      <Control
        forecast={forecastType}
        onChangeToHour={handleChangeForecastToHourly}
        onChangeToWeek={handleChangeForecastToWeekly}
      />
      <Forecast list={forecastData} />
      <Widgets />
    </div>
  );
}
