import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EViewport } from '../../../../store/viewport/action';
import { TRootState } from '../../../../store/storeRedux';
import { ETypeTemp, updateTypeTemperature } from '../../../../store/typeTemperature/action';
import { EForecasts } from '../Modal';
import classnames from 'classnames';
import styles from '../../../../styles/control.scss';

interface IControlProps {
  forecast: EForecasts;
  onChangeToHour: () => void;
  onChangeToWeek: () => void;
}

export function Control({ forecast, onChangeToHour, onChangeToWeek }: IControlProps) {
  const dispatch = useDispatch();
  const typeTemp = useSelector<TRootState, ETypeTemp>((state) => state.typeTemp);
  const viewport = useSelector<TRootState, EViewport>((state) => state.viewport);

  const handleSwitchTypeTemp = (value: ETypeTemp) => {
    dispatch(updateTypeTemperature(value));
  };

  useEffect(() => {
    localStorage.setItem('typeTemp', typeTemp);
  }, [typeTemp]);

  return (
    <div className={styles.control}>
      <div className={styles.switchForecast}>
        <button
          onClick={onChangeToHour}
          className={classnames(
            styles.switchBtn,
            forecast === EForecasts.hourly ? styles.active : ''
          )}
        >
          <span>Today</span>
        </button>
        <button
          onClick={onChangeToWeek}
          className={classnames(
            styles.switchBtn,
            forecast === EForecasts.weekly ? styles.active : ''
          )}
        >
          <span>Week</span>
        </button>
      </div>
      {viewport === EViewport.desktop && (
        <div className={styles.switchTemp}>
          <button
            className={classnames(
              styles.switchBtn,
              typeTemp === ETypeTemp.celsius ? styles.active : ''
            )}
            onClick={() => handleSwitchTypeTemp(ETypeTemp.celsius)}
          >
            <span>C</span>
          </button>
          <button
            className={classnames(
              styles.switchBtn,
              typeTemp === ETypeTemp.fahrenheit ? styles.active : ''
            )}
            onClick={() => handleSwitchTypeTemp(ETypeTemp.fahrenheit)}
          >
            <span>F</span>
          </button>
        </div>
      )}
    </div>
  );
}
