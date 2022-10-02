import React from 'react';
import styles from '../../../styles/calcgroup.scss';

interface ICalcGroupProps {
  title: string;
  amount: number;
}

export function CalcGroup({ title, amount }: ICalcGroupProps) {
  return (
    <div className={styles.formGroup}>
      <span className={styles.formGroupTitle}>{title}</span>
      <div className={styles.calc}>
        <span className={styles.amount}>{amount}</span>
        <span className={styles.currency}>₽</span>
      </div>
    </div>
  );
}
