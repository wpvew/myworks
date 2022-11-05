import React from 'react';
import { ClientCard } from './ClientCard';
import { useClientListData } from '../../../../../hooks/useClientsListData';
import styles from '../../../../../styles/clientlist.scss';

export function ClientList() {
  const { clientList, error, loading } = useClientListData();

  return (
    <div className={styles.tableContent}>
      {!loading && !error.message && clientList.length > 0 && (
        <ul className={styles.clientList}>
          {clientList.map((client) => (
            <ClientCard key={client._id} clientData={client} />
          ))}
        </ul>
      )}
      {!loading && clientList.length <= 0 && <div className={styles.serviceMsg}>Клиенты не найдены</div>}
      {loading && <div className={styles.serviceMsg}>Загрузка...</div>}
      {error.message && <div className={styles.serviceMsg}>{error.message}</div>}
    </div>
  );
}
