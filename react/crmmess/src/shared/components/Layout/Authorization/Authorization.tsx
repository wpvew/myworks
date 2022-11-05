import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { validationLogin } from '../../../utils/validation';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchUserByLogin } from '../../../store/slices/userSlice';
import { CustomLoadingBtn } from '../../UI/CustomLoadingBtn';
import { TError } from '../../../utils/ParseError';
import styles from '../../../styles/authorization.scss';

export type TAuthData = {
  username: string;
  password: string;
};

export function Authorization() {
  const [auth, setAuth] = useState({ username: '', password: '' });
  const [authError, setAuthError] = useState('');
  const { loading } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isCorrectAuth, setIsCorrectAuth] = useState<{
    username: boolean | null;
    password: boolean | null;
  }>({ username: null, password: null });

  const errMsgCountSymbol = <span className={styles.authError}>{'Минимальное кол-во символов 3'}</span>;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (Object.values(isCorrectAuth).every((item) => item)) {
      dispatch(fetchUserByLogin(auth))
        .then(({ payload }) => {
          if (payload?.error) throw payload.error;
          navigate('/contacts');
        })
        .catch((err: TError) => setAuthError(err.message));
    }
  };

  const handleClickLogin = () => {
    setIsCorrectAuth({ username: auth.username.length > 2, password: auth.password.length > 2 });
  };
  const handleClickSignUp = () => {
    navigate('/reg');
  };

  useEffect(() => {
    if (isCorrectAuth.username !== null) setIsCorrectAuth({ ...isCorrectAuth, username: auth.username.length > 2 });
  }, [auth.username]);
  useEffect(() => {
    if (isCorrectAuth.password !== null) setIsCorrectAuth({ ...isCorrectAuth, password: auth.password.length > 2 });
  }, [auth.password]);

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setAuth({ ...auth, username: validationLogin(e.target.value) });
  };
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setAuth({ ...auth, password: e.target.value });
  };
  return (
    <div className={styles.container}>
      <div className={styles.authorization}>
        <h2 className={styles.title}>Авторизация</h2>
        <form className={styles.authorizationForm} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <span className={styles.inputTitle}>Логин</span>
            <input
              className={styles.input}
              value={auth.username}
              onChange={handleChangeLogin}
              type='text'
              name='login'
              placeholder='login'
              autoComplete='off'
            />
            {isCorrectAuth.username === false && errMsgCountSymbol}
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.inputTitle}>Пароль</span>
            <input
              className={styles.input}
              value={auth.password}
              onChange={handleChangePassword}
              type='password'
              name='password'
              placeholder='password'
              autoComplete='off'
            />
            {isCorrectAuth.password === false && errMsgCountSymbol}
          </div>
          <div className={styles.controlBtn}>
            <CustomLoadingBtn type='submit' loading={loading} onClick={handleClickLogin} variant='outlined'>
              Вход
            </CustomLoadingBtn>
            <button className={styles.sighupBtn} onClick={handleClickSignUp} disabled={loading}>
              Регистрация
            </button>
          </div>
          {authError && <span className={styles.errMsg}>{authError}</span>}
        </form>
      </div>
    </div>
  );
}
