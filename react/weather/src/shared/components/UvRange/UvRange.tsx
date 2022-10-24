import React from 'react';
import { useSelector } from 'react-redux';
import { TCurrentWeatherData } from '../../hooks/useWeatherData';
import { TRootState } from '../../store/storeRedux';
import styles from '../../styles/uvrange.scss';

export function UvRange() {
  const currentWeatherData = useSelector<TRootState, TCurrentWeatherData>(
    (state) => state.weatherStore.data.currentWeatherData
  );
  return (
    <div className={styles.uv}>
      <span className={styles.range}>
        <span
          className={styles.bar}
          style={{ width: `${(currentWeatherData.uv / 12) * 100}%` }}
        ></span>
      </span>
    </div>
  );
}
