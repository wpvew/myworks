import React from 'react';
import { UContainer } from '../../components/UContainer';
import { Navbar } from '../../layouts/Navbar';
import styles from './dashboard.scss';

/**
 * RULS
 * 1 - Lead (all)
 * 2 - Warehouse (inventory)
 * 3 - Logistic (supplies)
 * 4 - Content (product info)
 * 5 - Analytic (prices)
 * 6 - HR (employees)
 */

export function Dashboard() {
  return (
    <main className={styles.main}>
      <section>
        <UContainer display='flex'>
          <Navbar />
        </UContainer>
      </section>
    </main>
  );
}
