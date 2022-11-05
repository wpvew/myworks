import React, { ChangeEvent, useEffect, useState } from 'react';
import { useAppSelector } from '../../../../store/hooks';
import { EIcons, Icon } from '../../../Icon';
import { ContactSelect } from './ContactSelect';
import InputMask from 'react-input-mask';
import classnames from 'classnames';
import Tippy from '@tippyjs/react';
import styles from '../../../../styles/clientcontacts.scss';

interface IClientContacts {
  onChangeContactValue: (e: ChangeEvent<HTMLInputElement>, id: string) => void;
  onChangeContactField: (field: string, id: string) => void;
  onAddContact: () => void;
  onDeleteContact: (id: string) => void;
}

export function ClientContacts(props: IClientContacts) {
  const { onChangeContactValue, onChangeContactField, onAddContact, onDeleteContact } = props;
  const clientData = useAppSelector((state) => state.clientDataReducer.clientData);
  const [isDropdownOped, setIsDropdownOpen] = useState('');

  useEffect(() => {
    const closeDropdown = () => {
      setIsDropdownOpen('');
    };
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, []);

  const handleClickSelector = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
    e.stopPropagation();
    setIsDropdownOpen((prev) => (!prev || prev !== id ? id : ''));
  };

  return (
    <div className={classnames(styles.contacts, clientData.contacts.length ? styles.noEmpty : '')}>
      {!!clientData.contacts.length && (
        <ul className={styles.contactList}>
          {clientData.contacts.map((contact) => (
            <li className={styles.contactGroup} key={contact.id}>
              <ContactSelect
                onSelect={handleClickSelector}
                isDropdownOped={isDropdownOped === contact.id}
                contact={contact}
                onChangeContactField={onChangeContactField}
              />
              <InputMask
                value={contact.value}
                className={styles.contactInput}
                name={contact.field}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeContactValue(e, contact.id)}
                type={contact.type}
                mask={contact.field === 'phone' ? '+7(999)999-99-99' : ''}
              ></InputMask>
              <Tippy content='Remove contact'>
                <button onClick={() => onDeleteContact(contact.id)} className={styles.contactDeleteBtn} type='button'>
                  <Icon name={EIcons.close} />
                </button>
              </Tippy>
              {contact.isValid === false && <span className={styles.errMsg}>Incorrect data</span>}
            </li>
          ))}
        </ul>
      )}
      <button className={styles.addContactBtn} onClick={onAddContact} type='button'>
        <span className={styles.icon}>
          <Icon name={EIcons.plus} />
        </span>
        <span className={styles.text}>Добавить контакт</span>
      </button>
    </div>
  );
}
