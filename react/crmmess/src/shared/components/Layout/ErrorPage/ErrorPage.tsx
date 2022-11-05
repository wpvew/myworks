import React from 'react';
import styles from '../../../styles/errorpage.scss';

export function ErrorPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>404 Error</h1>
      <p className={styles.desc}>Page not found</p>
    </div>
  );
}
