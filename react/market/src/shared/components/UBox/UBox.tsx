import React, { CSSProperties } from 'react';
import styles from './ubox.scss';
import classNames from 'classnames';

interface IUBox {
  display?: 'flex' | 'block' | 'grid' | 'inline' | 'inline-block';
  children: React.ReactNode;
  sx?: CSSProperties;
}

export function UBox(props: IUBox) {
  const { display = 'block', children, sx } = props;
  const classname = classNames();
  return (
    <div style={{ display, ...sx }} className=''>
      {children}
    </div>
  );
}
