import React from 'react';
import styles from '../../styles/header.scss';
import { Container } from '../Container';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <h1 className={styles.title}>Рассчитайте стоимость автомобиля в лизинг</h1>
      </Container>
    </header>
  );
};
