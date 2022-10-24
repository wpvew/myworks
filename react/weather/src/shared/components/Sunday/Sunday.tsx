import React from 'react';
import { useSelector } from 'react-redux';
import { useSunPosition } from '../../hooks/useSunPosition';
import { TCurrentWeatherData } from '../../hooks/useWeatherData';
import { TRootState } from '../../store/storeRedux';
import styles from '../../styles/sunday.scss';

export function Sunday() {
  const currentWeatherData = useSelector<TRootState, TCurrentWeatherData>(
    (state) => state.weatherStore.data.currentWeatherData
  );
  const [sunPosition, track] = useSunPosition();

  return (
    <>
      <div className={styles.radius}>
        <div className={styles.semiCircle}>
          <div className={styles.sunWrap}>
            <span className={styles.sun} style={{ transform: `rotate(${sunPosition}deg)` }}></span>
          </div>
          <div className={styles.cont}>
            <svg
              className={styles.svg}
              width='220'
              height='220'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
            >
              <circle
                className={styles.range}
                r='109'
                cx='110'
                cy='110'
                fill='transparent'
                strokeDasharray='675.24'
                strokeDashoffset='0'
              />
              <circle
                className={styles.bar}
                r='109'
                cx='110'
                cy='110'
                fill='transparent'
                strokeDasharray='675.24'
                strokeDashoffset={track}
              />
            </svg>
          </div>
          <div className={styles.graph}>
            <div className={styles.graphName}>
              <span>sunrise</span>
              <span>sunset</span>
            </div>
            <div className={styles.graphValue}>
              <span>{currentWeatherData.sunrise}</span>
              <span>{currentWeatherData.sunset}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
