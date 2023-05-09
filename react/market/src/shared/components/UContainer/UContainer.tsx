import React from 'react';
import styles from './ucontainer.scss';
import classNames from 'classnames';

interface IUContainer {
  children: React.ReactNode;
  display?: 'flex' | 'block';
}

export function UContainer(props: IUContainer) {
  const { children, display = 'block' } = props;
  return (
    <div className={styles.container} style={{ display }}>
      {children}
    </div>
  );
}
