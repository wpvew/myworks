import React from 'react';
import styles from '../../styles/layout.scss';
import { Header } from './Header';

interface ILayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: ILayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />
      {children}
    </div>
  );
};
