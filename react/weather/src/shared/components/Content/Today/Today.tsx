import React from 'react';
import { useSelector } from 'react-redux';
import { TCurrentWeatherData } from '../../../hooks/useWeatherData';
import { TRootState } from '../../../store/storeRedux';
import { ETypeTemp } from '../../../store/typeTemperature/action';
import styles from '../../../styles/today.scss';

export function Today() {
  const currentWeatherData = useSelector<TRootState, TCurrentWeatherData>(
    (state) => state.weatherStore.data.currentWeatherData
  );
  const typeTemp = useSelector<TRootState, ETypeTemp>((state) => state.typeTemp);
  const today = currentWeatherData.weekday;

  return (
    <div className={styles.today}>
      <div className={styles.day}>
        <span className={styles.title}>Today</span>
        <span className={styles.weekDay}>{today}</span>
      </div>
      <div className={styles.temp}>
        <span className={styles.valueTemp}>
          {typeTemp === ETypeTemp.celsius
            ? currentWeatherData.maxtemp_c
            : currentWeatherData.maxtemp_f}
        </span>
        <span className={styles.valueTemp}>
          {typeTemp === ETypeTemp.celsius
            ? currentWeatherData.mintemp_c
            : currentWeatherData.mintemp_f}
        </span>
      </div>
    </div>
  );
}
