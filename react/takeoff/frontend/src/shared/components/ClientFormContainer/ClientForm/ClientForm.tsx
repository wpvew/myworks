import React, { ChangeEvent, FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { TClientDataMod } from '../ClientFormContainer';
import { PersonDataFields } from './PersonDataFields';
import { ClientContacts } from './ClientContacts';
import styles from '../../../styles/managementclient.scss';
import { CustomLoadingBtn } from '../../UI/CustomLoadingBtn';

interface IClientForm {
  loading: boolean;
  onChangeData: (e: ChangeEvent<HTMLInputElement>, field: keyof Omit<TClientDataMod, 'contacts'>) => void;
  onChangeContactValue: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  onChangeContactField: (field: string, id: string) => void;
  onAddContact: () => void;
  onDeleteContact: (id: string) => void;
  onSubmitForm: (e: FormEvent) => void;
  validation: () => void;
}

export function ClientForm({
  loading,
  onChangeData,
  onChangeContactValue,
  onChangeContactField,
  onAddContact,
  onDeleteContact,
  onSubmitForm,
  validation,
}: IClientForm) {
  const params = useParams() as { id: string; [N: string]: string };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{params.id ? 'Изменить данные' : 'Новый клиента'}</h2>
        {params.id && <span className={styles.clientId}>ID: {params.id}</span>}
      </div>
      <form className={styles.form} onSubmit={(e: FormEvent) => onSubmitForm(e)}>
        <PersonDataFields onChangeData={onChangeData} />
        <ClientContacts
          onChangeContactValue={onChangeContactValue}
          onChangeContactField={onChangeContactField}
          onAddContact={onAddContact}
          onDeleteContact={onDeleteContact}
        />
        <CustomLoadingBtn type='submit' loading={loading} onClick={validation}>
          Сохранить
        </CustomLoadingBtn>
      </form>
    </div>
  );
}
