import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { serverAPI, TServerResponse } from '../../../../../API/serverAPI';
import { TRootState } from '../../../../../store/storeRedux';
import { Link } from 'react-router-dom';
import { TClientList } from '../../../../../store/clientList/reducer';
import { useDispatch } from 'react-redux';
import { updataClientListData, updataClientListDataError, updataClientListDataSuccess } from '../../../../../store/clientList/action';
import { ClientCard } from './ClientCard';
import styles from './clientlist.scss';

export type TClientData = {
  id?: string
  name: string;
  surname: string;
  lastName: string;
  contacts: {
    type: string;
    name: string;
    value: string;
  }[];
  showMore?: boolean
};

export function ClientList() {
  const token = useSelector<TRootState, string>(state => state.token);
  const { data: clientList, loader, error } = useSelector<TRootState, TClientList>(state => state.clientListDate);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updataClientListData());
    serverAPI.getClientList(token).then((res: TServerResponse) => {
      if (res.error) throw res.error
      dispatch(updataClientListDataSuccess(res.data))
    }).catch(err => dispatch(updataClientListDataError(err)));
  }, [])

  const handleDelete = (id: string) => {
    dispatch(updataClientListData());
    serverAPI.deleteClient(id, token).then((res: TServerResponse) => {
      if (res.error) throw res.error
      dispatch(updataClientListDataSuccess(clientList.filter(client => client.id !== id)))
    }).catch(err => dispatch(updataClientListDataError(err)));
  }

  return (
    <div className={styles.content}>
      <h2 className={styles.title}>Контакты</h2>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span className={styles.clientTitle} client-data="id">ID</span>
          <span className={styles.clientTitle} client-data="FIO">ФИО</span>
          <span className={styles.clientTitle} client-data="contacts">Контакты</span>
          <span className={styles.clientTitle} client-data="buttons">Управление</span>
        </div>
        <div className={styles.tableContent}>
          {loader && !error
            ? <div className={styles.serviceMsg}>Загрузка...</div>
            : clientList.length <= 0
              ? <div className={styles.serviceMsg}>Клиенты не найдены</div>
              : <ul className={styles.clientList}>
                  {clientList.map(client => (
                    <ClientCard key={client.id} clientData={client} deleteClient={handleDelete}/>
                  ))}
                </ul>
          }
          {error && <div className={styles.serviceMsg}>{error}</div>}
        </div>
      </div>
      <Link to={'/contacts/create'} className={styles.btnAddition}>Добавить клиента</Link>
    </div>
  );
}
