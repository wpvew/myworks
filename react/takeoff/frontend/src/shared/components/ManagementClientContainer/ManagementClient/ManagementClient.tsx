import React, { ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { TClientData } from '../../Layout/Content/ClientList';
import { TIsCorrectData } from '..';
import { Modal } from '../../Modal';
import styles from './managementclient.scss';

interface IManagmentClientProps {
  clientData: TClientData,
  isCorrectData: TIsCorrectData,
  submitForm: (e: FormEvent) => void,
  create: () => void,
  update: () => void,
  changeContact: (e: ChangeEvent<HTMLInputElement>, type: string) => void,
  changeName: (e: ChangeEvent<HTMLInputElement>, type: string) => void,
  closeModal: () => void
}

export function ManagementClient ({ clientData, submitForm, create, update, changeContact, changeName, isCorrectData, closeModal }: IManagmentClientProps) {
  const params = useParams() as {id: string, [N: string]: string};
  const errMsgCountSymbol = <span className={styles.errMsg}>{'Минимальное кол-во символов 3'}</span>
  const errMsgPhone = <span className={styles.errMsg}>{'Телефон некорректный (7-11 символов)'}</span>
  const errMsgEmail = <span className={styles.errMsg}>{'Некорретный Email'}</span>

  return(
    <Modal>
      <div className={styles.container}>
        <h2 className={styles.title}>{params.id === 'create' ? 'Новый клиента' : 'Изменить данные'}</h2>
        <form className={styles.form} onSubmit={(e: FormEvent) => submitForm(e)}>
          <div className={styles.inputGroup} >
            <span className={styles.inputTitle}>Фамилия</span>
            <input value={clientData.surname} onChange={(e: ChangeEvent<HTMLInputElement>) => changeName(e, 'surname')} className={styles.input} type="text" name='surname'/>
            {isCorrectData.surname === false && errMsgCountSymbol}
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.inputTitle}>Имя</span>
            <input value={clientData.name} onChange={(e: ChangeEvent<HTMLInputElement>) => changeName(e, 'name')} className={styles.input} type="text" name='name'/>
            {isCorrectData.name === false && errMsgCountSymbol}
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.inputTitle}>Отчество</span>
            <input value={clientData.lastName} onChange={(e: ChangeEvent<HTMLInputElement>) => changeName(e, 'lastName')} className={styles.input} type="text" name='lastName'/>
            {isCorrectData.lastName === false && errMsgCountSymbol}
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.inputTitle}>Телефон</span>
            <input value={clientData.contacts.find(contact => contact.type === 'tel')?.value} onChange={(e:ChangeEvent<HTMLInputElement>) => changeContact(e, 'tel')}  className={styles.input} type="tel" name='phone'/>
            {isCorrectData.tel === false && errMsgPhone}
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.inputTitle}>Email</span>
            <input value={clientData.contacts.find(contact => contact.type === 'email')?.value} onChange={(e:ChangeEvent<HTMLInputElement>) => changeContact(e, 'email')}   className={styles.input} type="email" name='email'/>
            {isCorrectData.email === false && errMsgEmail}
          </div>
          {params.id === 'create'
            ? <button className={styles.btn} onClick={create}>Добавить</button>
            : <button className={styles.btn} onClick={update}>Изменить</button>
          }
        </form>
        <button onClick={closeModal} className={styles.btnClose}></button>
      </div>
    </Modal>
  );
}
