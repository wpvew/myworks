import React from 'react';
import { TClientData } from '../ClientList';
import { Link } from 'react-router-dom';
import styles from './clientcard.scss';

interface IClientCardProps {
  clientData: TClientData,
  deleteClient: (id: string) => void
}

export function ClientCard({ clientData, deleteClient }: IClientCardProps) {
  return (
    <li className={styles.client}>
      <span className={styles.clientInfo} client-data="id">{clientData.id}</span>
      <span className={styles.clientInfo} client-data="FIO">{clientData.surname} {clientData.name} {clientData.lastName}</span>
      <ul className={styles.clientInfo} client-data="contacts">
        {clientData.contacts?.map(contact => (
            <li className={styles.clientContact} key={`${contact.type}_${contact.value}_${clientData.id}`}>
              <span className={styles.contactType} >{contact.name}</span>
              <span className={styles.contactValue} >{contact.value}</span>
            </li>
          ))
        }
      </ul>
      <div className={styles.btns} client-data="buttons">
        <Link to={`/contacts/${clientData.id}`}>Изменить</Link>
        <button className={styles.btnDelete} onClick={() => deleteClient(clientData.id || '')}>Удалить</button>
      </div>
    </li>
  );
}
