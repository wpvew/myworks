import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import styles from '../../styles/serviceblock.scss';

interface IServiceBlockProps {
  error?: string;
}

export function ServiceBlock({ error }: IServiceBlockProps) {
  return (
    <div className={styles.service}>
      {error ? (
        <span>{error}</span>
      ) : (
        <RotatingLines
          strokeColor='grey'
          strokeWidth='5'
          animationDuration='0.75'
          width='40'
          visible={true}
        />
      )}
    </div>
  );
}
