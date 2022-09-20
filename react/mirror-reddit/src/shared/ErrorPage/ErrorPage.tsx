import React from 'react';
import { EColors, Text } from '../Text';
import styles from './error.css';

export function ErrorPage() {
  return (
    <div className={styles.errPage}>
      <Text size={20} color={EColors.black}>
        404 - page not found
      </Text>
    </div>
  );
}
