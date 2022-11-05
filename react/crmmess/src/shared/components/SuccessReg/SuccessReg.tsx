import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/successreg.scss';

export function SuccessReg() {
  return (
    <div className={styles.success}>
      <span className={styles.message}>Вы успешно зарегестрированы</span>
      <Link to={'/auth'} className={styles.link}>
        Перейти на страницу входа
      </Link>
    </div>
  );
}
