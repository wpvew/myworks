import React from 'react';
import { TLocationWeather } from '../../hooks/useLocationWeatherData';
import { LocationCard } from './LocationCard';
import styles from '../../styles/locationlist.scss';

interface ILocationListProps {
  list: TLocationWeather[];
  onDelete: (value: string) => void;
}

export function LocationList({ list, onDelete }: ILocationListProps) {
  return (
    <ul className={styles.list}>
      {list.map((location) => (
        <LocationCard locationData={location} onDelete={onDelete} key={location.location} />
      ))}
    </ul>
  );
}
