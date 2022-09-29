import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updataClientListDataSuccess } from '../../../../store/clientList/action';
import { TClientList } from '../../../../store/clientList/reducer';
import { TRootState } from '../../../../store/storeRedux';
import { setToken } from '../../../../store/token/action';
import { TClientData } from '../Content/ClientList';
import styles from './header.scss'

export const Header = () => {
  const token = useSelector<TRootState, string>(state => state.token);
  const { data: clientList, loader, error, isServerData } = useSelector<TRootState, TClientList>(state => state.clientListDate);
  const [list, setList] = useState<TClientData[]>([]);
  const dispatch = useDispatch()

  useEffect(() => {
    if(isServerData) {
      setList([...clientList]);
    }
  }, [clientList])

  const handleClickLogout = () => {
    dispatch(setToken(''))
    localStorage.removeItem('token')
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => {
      dispatch(updataClientListDataSuccess(list.filter(client =>
        (client.surname + ' ' + client.name + ' ' + client.lastName).toLowerCase().includes(e.target.value.toLowerCase())
      ), false))
    }, 500)
  }

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>CRM</h1>
      {token &&
        <>
          <input className={styles.inputSearch} onChange={(e:ChangeEvent<HTMLInputElement>) => handleInputChange(e)} type="text" name='search' placeholder='Поиск по ФИО'/>
          <button className={styles.btnLogout} onClick={handleClickLogout}>Выход</button>
        </>
      }
    </header>
  );
};
