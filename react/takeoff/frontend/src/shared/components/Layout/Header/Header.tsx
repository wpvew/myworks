import React, { ChangeEvent, useEffect, useState } from 'react';
import { UserProfile } from '../../UserProfile';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { TClientListState, updateClientListSuccess } from '../../../store/slices/clientListSlice';
import { TClientDataFromServer } from '../../../API/ApiServer';
import styles from '../../../styles/header.scss';
import { EIcons, Icon } from '../../Icon';

export const Header = () => {
  const { clientList, isServerData } = useAppSelector<TClientListState>((state) => state.clientListReducer);
  const token = useAppSelector<string>((state) => state.userReducer.user.token);
  const dispatch = useAppDispatch();
  const [list, setList] = useState<TClientDataFromServer[]>([]);
  const [value, setValue] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    if (isServerData) setList([...clientList]);
  }, [clientList]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setTimeout(() => {
      dispatch(
        updateClientListSuccess({
          list: list.filter((client) =>
            (client.surname + ' ' + client.name + ' ' + client.lastName)
              .toLowerCase()
              .includes(e.target.value.toLowerCase())
          ),
          isServerData: false,
        })
      );
    }, 500);
  };

  const handleClickProfile = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
  };
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>CRM</h1>
      {token && (
        <>
          <input
            value={value}
            className={styles.inputSearch}
            onChange={handleInputChange}
            type='text'
            name='search'
            placeholder='Поиск по ФИО'
          />
          <button onClick={handleClickProfile} className={styles.profile}>
            <Icon name={EIcons.profile} />
          </button>
        </>
      )}
      <UserProfile isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </header>
  );
};
