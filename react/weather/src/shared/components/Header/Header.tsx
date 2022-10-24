import React from 'react';
import { Link } from 'react-router-dom';
import { EIcons, Icon } from '../Icon';
import styles from '../../styles/header.scss';

export const Header = () => {
  return (
    <header className={styles.tabBar}>
      <span className={styles.tag}>Weather App</span>
      <Link to={`/locations`} className={styles.tabBtn}>
        <Icon name={EIcons.menu} />
      </Link>
    </header>
  );
};
