import React from 'react';
import { useSelector } from 'react-redux';
import { TCurrentWeatherData } from '../../hooks/useWeatherData';
import { useWindDirection } from '../../hooks/useWindDirection';
import { TRootState } from '../../store/storeRedux';
import { EIcons, Icon } from '../Icon';
import styles from '../../styles/compass.scss';

export function Compass() {
  const currentWeatherData = useSelector<TRootState, TCurrentWeatherData>(
    (state) => state.weatherStore.data.currentWeatherData
  );
  const windDir = useWindDirection(currentWeatherData.wind_dir);
  return (
    <div className={styles.compass}>
      <span className={styles.diraction} data-dir='N'>
        N
      </span>
      <span className={styles.diraction} data-dir='S'>
        S
      </span>
      <span className={styles.diraction} data-dir='W'>
        W
      </span>
      <span className={styles.diraction} data-dir='E'>
        E
      </span>
      <span className={styles.arrow} style={{ transform: `rotate(${windDir}deg)` }}>
        <Icon name={EIcons.arrow} />
      </span>
      <span className={styles.windValue}>{currentWeatherData.wind_dir}</span>
      <span className={styles.windValue}>{currentWeatherData.wind_kph}</span>
      <svg height='160' width='160'>
        <circle cx='80' cy='80' r='75' stroke='black' strokeWidth='3' fill='transparent' />
      </svg>
    </div>
  );
}
