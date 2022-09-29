import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { serverAPI, TServerResponse } from '../../../API/serverAPI';
import { setToken } from '../../../store/token/action';
import { validationLogin } from '../../utils/validation';
import styles from './authorization.scss';

export type TAuthData = {
  login: string,
  password: string
}

export function Authorization() {
  const [auth, setAuth] = useState({login: '', password: ''});
  const [isCorrectAuth, setIsCorrectAuth] = useState<{login: boolean | null, password: boolean | null}>({login: null, password: null})
  const [authError, setAuthError] = useState('')
  const dispatch = useDispatch();
  const errMsgCountSymbol = <span className={styles.errMsg}>{'Минимальное кол-во символов 3'}</span>

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (isCorrectAuth.login, isCorrectAuth.password) {
      serverAPI.autorization(auth)
        .then((res: TServerResponse) => {
        if(res.error) throw res.error;
        localStorage.setItem('token', res.data.token)
        dispatch(setToken(res.data.token))
        })
        .catch(err => setAuthError(err))
    }
  }

  const handleClickLogin = () => {
    setIsCorrectAuth({login: auth.login.length > 2, password: auth.password.length > 2})
  }

  useEffect(() => {
    if(isCorrectAuth.login !== null) setIsCorrectAuth({...isCorrectAuth, login: auth.login.length > 2})
  }, [auth.login])
  useEffect(() => {
    if(isCorrectAuth.password !== null) setIsCorrectAuth({...isCorrectAuth, password: auth.password.length > 2})
  }, [auth.password])

  const handleChangeLogin = (e: ChangeEvent<HTMLInputElement>) => {
    setAuth({...auth, login: validationLogin(e.target.value)});
  }
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setAuth({...auth, password: e.target.value})
  }
  return (
    <div className={styles.container}>
      <div className={styles.authorization}>
        <h2 className={styles.title}>Авторизация</h2>
        <form className={styles.authorizationForm} onSubmit={(e: FormEvent) => handleSubmit(e)}>
          <div className={styles.inpurGroup}>
            <span className={styles.inputTitle}>Логин</span>
            <input className={styles.input} value={auth.login} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeLogin(e)} type="text" name='login' placeholder='login' autoComplete='off'/>
            {isCorrectAuth.login === false && errMsgCountSymbol}
          </div>
          <div className={styles.inpurGroup}>
            <span className={styles.inputTitle}>Пароль</span>
            <input className={styles.input} value={auth.password} onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangePassword(e)} type="password" name='password' placeholder='password' autoComplete='off' />
            {isCorrectAuth.password === false && errMsgCountSymbol}
          </div>
          <button className={styles.btn} onClick={handleClickLogin}>Вход</button>
          {authError && <span className={styles.authError}>{authError}</span>}
        </form>
      </div>
    </div>
  );
}
