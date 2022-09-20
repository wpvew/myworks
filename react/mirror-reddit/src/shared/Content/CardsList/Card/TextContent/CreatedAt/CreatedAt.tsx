import React from 'react';
import styles from './createdat.css';

interface ICreatedAtProps {
  timeAgo: string;
}

export function CreatedAt({ timeAgo }: ICreatedAtProps) {
  return (
    <span className={styles.createdAt}>
      <span className={styles.publishedLable}>опубликовано </span>
      {timeAgo}
    </span>
  );
}
