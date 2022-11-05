import React from 'react';
import { TContact } from '../../../ClientFormContainer';
import classnames from 'classnames';
import styles from '../../../../../styles/contactselect.scss';

interface IContactSelect {
  contact: TContact;
  onChangeContactField: (field: string, id: string) => void;
  onSelect: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => void;
  isDropdownOped: boolean;
}

export function ContactSelect({ contact, onChangeContactField, isDropdownOped, onSelect }: IContactSelect) {
  const contactFieldList = {
    phone: 'Телефон',
    email: 'Email',
    facebook: 'Facebook',
    contact: 'Другое',
    vk: 'VK',
  };
  return (
    <div className={styles.contactSelector}>
      <div className={classnames(styles.selected, isDropdownOped ? styles.active : '')}>
        <button onClick={(e) => onSelect(e, contact.id)} type='button' className={styles.selectorBtn}>
          {contactFieldList[contact.field as keyof typeof contactFieldList]}
        </button>
      </div>
      {isDropdownOped && (
        <div className={styles.dropdown}>
          <ul className={styles.contactFieldList}>
            {(Object.keys(contactFieldList) as Array<keyof typeof contactFieldList>).map((contactField) => (
              <li className={styles.contactField} key={contactField}>
                <button
                  className={styles.contactFieldBtn}
                  type='button'
                  onClick={() => onChangeContactField(contactField, contact.id)}
                >
                  <span>{contactFieldList[contactField]}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
