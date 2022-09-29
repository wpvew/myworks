import React from 'react';
import styles from './content.scss';

interface IContentProps {
  children: React.ReactNode
}

export function Content({ children }: IContentProps) {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {children}
      </div>
    </main>
  );
}
