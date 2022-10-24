import React from 'react';
import { TLocationWeather } from '../../../hooks/useLocationWeatherData';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TRootState } from '../../../store/storeRedux';
import { ETypeTemp } from '../../../store/typeTemperature/action';
import styles from '../../../styles/locationcard.scss';

interface ILocationCard {
  locationData: TLocationWeather;
  onDelete: (value: string) => void;
}

export function LocationCard({ locationData, onDelete }: ILocationCard) {
  const typeTemp = useSelector<TRootState, ETypeTemp>((state) => state.typeTemp);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onDelete(locationData.location);
  };
  return (
    <li className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.left}>
          <div className={styles.temp}>
            <span>
              {typeTemp === ETypeTemp.celsius ? locationData.temp_c : locationData.temp_f},{' '}
            </span>
            <span className={styles.condition}>{locationData.condition_name.toLowerCase()}</span>
          </div>
          <Link className={styles.name} to={`/weather/${locationData.location}`}>
            {locationData.location}, {locationData.region}
          </Link>
        </div>
        <div className={styles.image}>
          <img
            className={styles.conditionIcon}
            src={locationData.condition_icon}
            alt={locationData.condition_name}
          />
        </div>
        {localStorage.location !== locationData.location && (
          <button className={styles.closeBtn} onClick={handleClick}>
            <span></span>
          </button>
        )}
      </div>
    </li>
  );
}
