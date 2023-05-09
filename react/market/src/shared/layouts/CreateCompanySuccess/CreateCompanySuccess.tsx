import React from 'react';
import { Link } from 'react-router-dom';
import { TLoginData } from '../../pages/Auth';
import { UBox } from '../../components/UBox';
import { UTypegraphy } from '../../components/UTypegraphy';
import { UButton } from '../../components/UButton';
import styles from './createcompanysuccess.scss';

interface ICreateCompanySuccessProps {
  employeeData: TLoginData;
}

export function CreateCompanySuccess({ employeeData }: ICreateCompanySuccessProps) {
  const loginTitle = {
    username: 'Username',
    password: 'Password',
    companyId: 'Company ID',
  };
  return (
    <div className={styles.box}>
      <UTypegraphy Tag='h3' size='xl' sx={{ marginBottom: '5px' }}>
        Компания была успешно зарегистрирована
      </UTypegraphy>
      <UTypegraphy Tag='p' size='m' sx={{ marginBottom: '30px' }}>
        Пожалуйста сохраните данные для входа
      </UTypegraphy>
      <ul style={{ marginBottom: '30px' }}>
        {(Object.keys(employeeData) as Array<keyof TLoginData>).map((key) => (
          <UBox key={key} sx={{ marginBottom: '10px' }}>
            <UTypegraphy Tag='span'>{loginTitle[key]}: </UTypegraphy>
            <UTypegraphy Tag='span'>{employeeData[key]}</UTypegraphy>
          </UBox>
        ))}
      </ul>
      <UButton Tag={Link} href='/' size='xs'>
        Вернуться на главную страницу
      </UButton>
    </div>
  );
}
