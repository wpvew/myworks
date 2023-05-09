import React, { FormEvent } from 'react';
import { UTypegraphy } from '../UTypegraphy';
import styles from './uformwrap.scss';
import { UButton } from '../UButton';
import classNames from 'classnames';

interface IUFormWrap {
  title: string;
  children: React.ReactNode;
  handleSubmit: (e: FormEvent) => void;
  className?: string;
  buttonText: string;
  variant?: 'none' | 'outlined';
}
export function UFormWrap({
  title,
  className,
  children,
  handleSubmit,
  buttonText,
  variant = 'outlined',
}: IUFormWrap) {
  return (
    <div className={classNames(variant === 'outlined' ? styles.outlined : styles.box)}>
      <div className={styles.boxHeader}>
        <UTypegraphy Tag='h2' size='l' sx={{ textAlign: 'center' }}>
          {title}
        </UTypegraphy>
      </div>
      <form className={className} onSubmit={handleSubmit}>
        {children}
        <UButton Tag='button' size='xs' sx={{ marginTop: '20px', alignSelf: 'flex-end' }}>
          {buttonText}
        </UButton>
      </form>
    </div>
  );
}
