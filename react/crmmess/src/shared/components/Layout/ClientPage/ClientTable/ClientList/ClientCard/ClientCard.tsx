import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { EIcons, Icon } from '../../../../../Icon';
import { TClientDataFromServer } from '../../../../../../API/ApiServer';
import { useAppSelector } from '../../../../../../store/hooks';
import { Modal } from '../../../../../Modal';
import { EViewport } from '../../../../../../store/slices/viewportSlice';
import { ConfirmDelete } from '../../../../../ConfirmDelete';
import Tippy from '@tippyjs/react';
import styles from '../../../../../../styles/clientcard.scss';

interface IClientCardProps {
  clientData: TClientDataFromServer;
}

export function ClientCard({ clientData }: IClientCardProps) {
  const [isOpenDeleteConfirmModal, setIsOpenDeleteConfirmModal] = useState(false);
  const viewport = useAppSelector((state) => state.viewportReducer.viewport);

  const handleClickDeleteConfirmModal = () => {
    setIsOpenDeleteConfirmModal(!isOpenDeleteConfirmModal);
  };
  return (
    <li className={styles.client}>
      {/* <span className={styles.clientInfo} client-data="id">{clientData._id}</span> */}
      <span className={styles.clientInfo} client-data='FIO'>
        {clientData.surname} {clientData.name} {clientData.lastName}
      </span>
      {viewport !== EViewport.mobile && (
        <>
          <span className={styles.clientInfo} client-data='createdAt'>
            <span className={styles.date}>{clientData.createdAt.split('T')[0].split('-').reverse().join('.')}</span>{' '}
            <span className={styles.time}>
              {clientData.createdAt.split('T')[1].split('.')[0].split(':').slice(0, 2).join(':')}
            </span>
          </span>
          <span className={styles.clientInfo} client-data='updatedAt'>
            <span className={styles.date}>{clientData.updatedAt.split('T')[0].split('-').reverse().join('.')}</span>{' '}
            <span className={styles.time}>
              {clientData.updatedAt.split('T')[1].split('.')[0].split(':').slice(0, 2).join(':')}
            </span>
          </span>
        </>
      )}
      {viewport !== EViewport.minTable && viewport !== EViewport.mobile && (
        <ul className={styles.contactList} client-data='contacts'>
          {clientData.contacts.map((contact) => (
            <li className={styles.contactItem} key={`${contact.type}_${contact.value}_${clientData._id}`}>
              <Tippy interactive={true} content={contact.value}>
                <button>
                  <Icon name={EIcons[contact.field as keyof typeof EIcons]} />
                </button>
              </Tippy>
            </li>
          ))}
        </ul>
      )}
      <div className={styles.btns} client-data='buttons'>
        <Link to={`/contacts/${clientData._id}`}>
          <Icon name={EIcons.pen} />
          <span>{viewport !== EViewport.minTable && viewport !== EViewport.mobile ? 'Изменить' : 'Открыть'}</span>
        </Link>
        <button className={styles.btnDelete} onClick={handleClickDeleteConfirmModal}>
          <Icon name={EIcons.close} />
          <span>Удалить</span>
        </button>
      </div>
      {isOpenDeleteConfirmModal && (
        <Modal onClose={handleClickDeleteConfirmModal}>
          <ConfirmDelete id={clientData._id} onClose={handleClickDeleteConfirmModal} />
        </Modal>
      )}
    </li>
  );
}
