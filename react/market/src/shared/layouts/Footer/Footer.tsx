import React from 'react';
import styles from './footer.scss';
import { UBox } from '../../components/UBox';
import { UTypegraphy } from '../../components/UTypegraphy';
import { UContainer } from '../../components/UContainer';
import { UButton } from '../../components/UButton';
import { Link } from 'react-router-dom';
import { contactList, footerMenu } from './data';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <UContainer>
        <UBox
          sx={{
            marginBottom: '10px',
            paddingBottom: '10px',
            borderBottom: '1px solid rgba(49, 45, 112, .2',
          }}
        >
          <UTypegraphy Tag='p' size='l'>
            SellerBoard
          </UTypegraphy>
        </UBox>
        <UBox display='grid' sx={{ gridTemplateColumns: '2fr 2fr 1fr', columnGap: '50px' }}>
          <UBox sx={{ borderRight: '1px solid rgba(49, 45, 112, .2)' }}>
            <UTypegraphy Tag='p' size='s' sx={{ maxWidth: '500px' }}>
              Sellerboared- система сквозной аналитики для поставщиков Wildberiies. Позволяет кратно
              ускорить процесс анализа данных, выявить слабые места, оптимизировать расходы и
              увеличить прибыль.
            </UTypegraphy>
          </UBox>
          <UBox sx={{ borderRight: '1px solid rgba(49, 45, 112, .2)' }}>
            <ul>
              {footerMenu.map((item) => (
                <li key={item.link}>
                  <UButton Tag={Link} href={item.link} variant='text' size='xs'>
                    {item.value}
                  </UButton>
                </li>
              ))}
            </ul>
          </UBox>
          <UBox>
            <ul>
              {contactList.map((contact, i) => (
                <li key={i}>
                  {/* <a href={contact.type + contact.link}>{contact.value}</a> */}
                  <UButton Tag={'a'} variant='text' size='xs' href={contact.type + contact.link}>
                    {contact.value}
                  </UButton>
                </li>
              ))}
            </ul>
          </UBox>
        </UBox>
      </UContainer>
    </footer>
  );
}
