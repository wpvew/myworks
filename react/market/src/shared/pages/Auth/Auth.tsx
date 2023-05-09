import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchEmployeeByLogin, removeError } from '../../store/slice/emplyeeSlice';
import { useNavigate } from 'react-router-dom';
import { objectBlender } from '../../utils/objectBlender';
import { UContainer } from '../../components/UContainer';
import { UFormWrap } from '../../components/UFormWrap';
import { UFormFlood } from '../../components/UFormWrap/UFormFlood';
import { TField } from '../Register';
import styles from './auth.scss';

export type TLoginData = {
  username: string;
  password: string;
  companyId: string;
};

export type TLoginField = Record<'username' | 'password' | 'companyId', TField>;

export function Auth() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.emplyeeSliceReducer.error);
  const [login, setLogin] = useState<TLoginField>({
    username: { enTitle: 'Username', value: '', placeholder: 'Username' },
    password: { enTitle: 'Password', value: '', placeholder: 'Password' },
    companyId: { enTitle: 'Company ID', value: '', placeholder: 'Company ID' },
  });

  const handleChangeLogin = (field: keyof typeof login, e: ChangeEvent<HTMLInputElement>) => {
    setLogin({ ...login, [field]: { ...login[field], value: e.target.value } });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const loginData = objectBlender(login);
    dispatch(fetchEmployeeByLogin(loginData)).then((data) => {
      if (!data.payload?.error.statusCode) navigate('/dashboard');
    });
  };

  useEffect(() => {
    if (error.statusCode) dispatch(removeError());
  }, [...Object.values(login)]);

  return (
    <main className={styles.main}>
      <section className={styles.auth}>
        <UContainer display='flex'>
          <UFormWrap title='Авторизация' handleSubmit={handleSubmit}>
            <UFormFlood
              data={login}
              handleChange={handleChangeLogin}
              buttonText={'Войти'}
              errorMsg={error}
            />
          </UFormWrap>
        </UContainer>
      </section>
    </main>
  );
}
