import React, { ChangeEvent } from 'react';
import { TClientDataMod } from '../../ClientFormContainer';
import { useAppSelector } from '../../../../store/hooks';
import classnames from 'classnames';
import styles from '../../../../styles/persondatafields.scss';

interface IPersonDataFields {
  onChangeData: (e: ChangeEvent<HTMLInputElement>, field: keyof Omit<TClientDataMod, 'contacts'>) => void;
}

export function PersonDataFields({ onChangeData }: IPersonDataFields) {
  const clientData = useAppSelector((state) => state.clientDataReducer.clientData);
  const errMsgCountSymbol = <span className={styles.errMsg}>{'Минимальное кол-во символов 3'}</span>;

  return (
    <ul className={styles.list}>
      {(
        Object.keys(clientData).filter((data) => !['contacts'].includes(data)) as Array<
          keyof Omit<TClientDataMod, 'contacts'>
        >
      ).map((field) => (
        <li className={styles.inputGroup} key={field}>
          <input
            value={clientData[field].value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeData(e, field)}
            className={classnames(styles.input, clientData[field].value ? styles.active : '')}
            type={clientData[field].type}
            name={field}
          />
          <div className={styles.inputTitle}>
            <span>{clientData[field].title}</span>
            {clientData[field].isRequire && <span className={styles.requireMarker}>*</span>}
          </div>
          {field !== 'lastName' && clientData[field].isValid === false && errMsgCountSymbol}
        </li>
      ))}
    </ul>
  );
}
