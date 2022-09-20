import React, { useEffect, useState } from 'react';
import { useIsMounted } from '../../../../../../../MyHooks';
import styles from './savebutton.css';
import EScreens from '../../../../../../Visible/visible.css';

interface ISaveButtonProp {
  children?: string;
  className?: string;
}

export function SaveButton({ children, className = styles.saveButton }: ISaveButtonProp) {
  return (
    <button className={className}>
      <svg className={EScreens.desktop} width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <circle cx='10' cy='10' r='10' fill='#C4C4C4' />
        <path
          d='M6 7H5V14C5 14.55 5.45 15 6 15H13V14H6V7ZM14 5H8C7.45 5 7 5.45 7 6V12C7 12.55 7.45 13 8 13H14C14.55 13 15 12.55 15 12V6C15 5.45 14.55 5 14 5ZM13.5 9.5H11.5V11.5H10.5V9.5H8.5V8.5H10.5V6.5H11.5V8.5H13.5V9.5Z'
          fill='white'
        />
      </svg>

      <svg className={EScreens.mobile} width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M1.4 2.8H0V12.6C0 13.37 0.63 14 1.4 14H11.2V12.6H1.4V2.8ZM12.6 0H4.2C3.43 0 2.8 0.63 2.8 1.4V9.8C2.8 10.57 3.43 11.2 4.2 11.2H12.6C13.37 11.2 14 10.57 14 9.8V1.4C14 0.63 13.37 0 12.6 0ZM11.9 6.3H9.1V9.1H7.7V6.3H4.9V4.9H7.7V2.1H9.1V4.9H11.9V6.3Z'
          fill='#979797'
        />
      </svg>

      {children}
    </button>
  );
}
