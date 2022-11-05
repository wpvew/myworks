import React, { useEffect, useState } from 'react';
import { TClientDataFromServer } from '../../../../../API/ApiServer';
import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { updateClientListSuccess } from '../../../../../store/slices/clientListSlice';
import { generateId } from '../../../../../utils/generateRandomIndex';
import { EIcons, Icon } from '../../../../Icon';
import classnames from 'classnames';
import styles from '../../../../../styles/tableheader.scss';
import { EViewport } from '../../../../../store/slices/viewportSlice';

export function TableHeader() {
  const clientList = useAppSelector((state) => state.clientListReducer.clientList);
  const viewport = useAppSelector((state) => state.viewportReducer.viewport);
  const dispatch = useAppDispatch();
  const [currentSort, setCurrentSort] = useState<{ field: keyof TClientDataFromServer; isUpDirect: boolean }>({
    field: 'createdAt',
    isUpDirect: true,
  });

  const LIST = [
    { name: 'name', value: 'ФИО', isSorting: true, isShow: true },
    { name: 'createdAt', value: 'Создан', isSorting: true, isShow: viewport !== EViewport.mobile },
    { name: 'updatedAt', value: 'Обновлен', isSorting: true, isShow: viewport !== EViewport.mobile },
    {
      name: 'contacts',
      value: 'Контакты',
      isSorting: false,
      isShow: viewport !== EViewport.mobile && viewport !== EViewport.minTable,
    },
    { name: 'buttons', value: 'Управление', isSorting: false, isShow: true },
  ].map(generateId);

  const handleClickSort = (key: keyof TClientDataFromServer) => {
    setCurrentSort((prev) => ({
      ...currentSort,
      field: key,
      isUpDirect: prev.field === key ? !prev.isUpDirect : true,
    }));
  };

  useEffect(() => {
    const sortedList = currentSort.isUpDirect
      ? [...clientList].sort((a, b) => (a[currentSort.field] > b[currentSort.field] ? 1 : -1))
      : [...clientList].sort((a, b) => (a[currentSort.field] < b[currentSort.field] ? 1 : -1));
    dispatch(updateClientListSuccess({ list: sortedList }));
  }, [currentSort]);

  return (
    <div className={styles.tableHeader}>
      {(
        LIST as Array<{
          name: keyof TClientDataFromServer;
          id: string;
          value: string;
          isSorting: boolean;
          isShow: boolean;
        }>
      ).map((item) => {
        if (item.isShow)
          return (
            <li className={styles.tableTitle} client-data={item.name} key={item.id}>
              {item.isSorting ? (
                <button
                  onClick={() => handleClickSort(item.name)}
                  className={classnames(
                    styles.tableSortBtn,
                    item.name === currentSort.field ? styles.active : '',
                    currentSort.isUpDirect ? styles.up : styles.down
                  )}
                >
                  <span className={styles.text}>{item.value}</span>
                  <Icon name={EIcons.arrow} />
                </button>
              ) : (
                <span className={styles.text}>{item.value}</span>
              )}
            </li>
          );
      })}
    </div>
  );
}
