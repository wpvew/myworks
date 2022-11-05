import React from 'react';
import { ClientList } from './ClientList';
import { TableHeader } from './TableHeader';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { ClientFormContainer } from '../../../ClientFormContainer';
import { updateModalState } from '../../../../store/slices/modalSlice';
import styles from '../../../../styles/clienttable.scss';

export function ClientTable() {
  const isOpenCreateClientModal = useAppSelector((state) => state.modalReducer.isModalOpen);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.table}>
      <TableHeader />
      <ClientList />
      <button onClick={() => dispatch(updateModalState(true))} className={styles.btnAddition}>
        Добавить клиента
      </button>
      {isOpenCreateClientModal && <ClientFormContainer />}
    </div>
  );
}
