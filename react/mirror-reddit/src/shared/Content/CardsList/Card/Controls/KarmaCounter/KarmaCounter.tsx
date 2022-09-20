import React from 'react';
import { IKarmaCounterContainerProps } from '../KarmaCounterContainer';
import classNames from 'classnames';
import styles from './karmacounter.css';

interface IKarmaCounterProps extends Omit<IKarmaCounterContainerProps, 'id'> {
  clickUp: () => void;
  clickDown: () => void;
  classesAddition?: string;
}

export function KarmaCounter({ rating, like, isUserRating, clickUp, clickDown, classesAddition }: IKarmaCounterProps) {
  const classesCounter = classNames(styles.karmaCounter, classesAddition, isUserRating && styles.userRatung);

  const classesBtnUp = classNames(styles.up, like && styles.active);
  const classesBtnDown = classNames(styles.down, like === false && styles.active);

  return (
    <div className={classesCounter}>
      <button className={classesBtnUp} onClick={clickUp}>
        <svg width='19' height='10' viewBox='0 0 19 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M9.5 0L0 10H19L9.5 0Z' fill='#C4C4C4' />
        </svg>
      </button>
      <span className={styles.karmaValue}>{rating}</span>
      <button className={classesBtnDown} onClick={clickDown}>
        <svg className={styles.down} width='19' height='10' viewBox='0 0 19 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M9.5 0L0 10H19L9.5 0Z' fill='#C4C4C4' />
        </svg>
      </button>
    </div>
  );
}
