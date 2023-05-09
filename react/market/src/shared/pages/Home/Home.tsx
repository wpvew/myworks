import React from 'react';
import { Link } from 'react-router-dom';
import { UButton } from '../../components/UButton';
import { UContainer } from '../../components/UContainer';
import { UBox } from '../../components/UBox';
import { UTypegraphy } from '../../components/UTypegraphy';
import styles from './home.scss';

export function Home() {
  return (
    // <main className={styles.main}>
    <section className={styles.hero}>
      <UContainer>
        <UBox
          display='flex'
          sx={{ flexDirection: 'column', alignItems: 'center', padding: '150px 0 50px' }}
        >
          <UTypegraphy Tag='h1' size='titleL' sx={{ marginBottom: '50px' }}>
            Стань продавцом с SellerBoard
          </UTypegraphy>
          <UBox display='flex'>
            <UButton Tag={Link} href='/company' style='primary' sx={{ marginRight: '50px' }}>
              Создать компанию
            </UButton>
            <UButton Tag={Link} href='/login' style='primary'>
              Войти как сотрудник
            </UButton>
          </UBox>
        </UBox>
      </UContainer>
    </section>
    // </main>
  );
}
