import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { TCurrentWeatherData } from '../../../hooks/useWeatherData';
import { EViewport } from '../../../store/viewport/action';
import { TRootState } from '../../../store/storeRedux';
import { ETypeTemp } from '../../../store/typeTemperature/action';
import styles from '../../../styles/display.scss';

export function Display() {
  const currentWeatherData = useSelector<TRootState, TCurrentWeatherData>(
    (state) => state.weatherStore.data.currentWeatherData
  );
  const typeTemp = useSelector<TRootState, ETypeTemp>((state) => state.typeTemp);
  const viewport = useSelector<TRootState, EViewport>((state) => state.viewport);
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function getTime() {
    return new Date().toLocaleTimeString('en-US', {
      timeZone: currentWeatherData.timezone || 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return (
    <div className={styles.weather}>
      <div className={styles.about}>
        <h1 className={styles.city}>{currentWeatherData.location}</h1>
        <div className={styles.date}>
          <span className={styles.weekDay}>{currentWeatherData.weekday}, </span>
          <span className={styles.time}>{time}</span>
        </div>
      </div>
      <div className={styles.temperature}>
        <span>
          {typeTemp === ETypeTemp.celsius ? currentWeatherData.temp_c : currentWeatherData.temp_f}
        </span>
      </div>
      <span className={styles.condition}>{currentWeatherData.condition_name}</span>
      {viewport === EViewport.desktop && (
        <img src={currentWeatherData.condition_icon} alt={currentWeatherData.condition_name} />
      )}
    </div>
  );
}
