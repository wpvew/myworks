import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import styles from './spinner.module.css'

const Spinner = () => {
  return (
    <ThreeDots wrapperClass={styles.spinner} color="#00BFFF" height={80} width={80} />
  );
};

export default Spinner;
