import React from 'react';
import { ClientTable } from './ClientTable';
import { Outlet } from 'react-router-dom';
import styles from '../../../styles/content.scss';

export function ClientPage() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Контакты</h2>
          <ClientTable />
          <Outlet />
        </div>
      </div>
    </main>
  );
}
