import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostTab } from '../../store/postTabs/action';
import { TRootState } from '../../store/storeRedux';
import { generateId } from '../../utils/react/generateRandomIndex';
import { GenericList } from '../GenericList/GenericList';
import { EColors, Text } from '../Text';
import styles from './content.css';

interface IContentProps {
  children?: React.ReactNode;
}

// export type TPostTab = {
//   value: string;
//   name: string;
//   isDisabled?: boolean;
// };

// const postTabs: TPostTab[] = [
//   { value: 'all', name: 'Все' },
//   { value: 'viewed', name: 'Просмотренные', isDisabled: true },
//   { value: 'saved', name: 'Сохраненные' },
//   { value: 'my', name: 'Мои посты', isDisabled: true },
//   { value: 'commented', name: 'Прокомментированные', isDisabled: true },
// ];
// export const defaultPostTab = postTabs.find((tab) => tab.value === 'all') || { value: 'undefined', name: 'undefined' };

export function Content({ children }: IContentProps) {
  // const state = useSelector<TRootState, TRootState>((state) => state);
  // const dispatch = useDispatch();
  // const tabActive = state.tab.value;

  // useEffect(() => {
  //   if (localStorage.postTab) {
  //     dispatch(updatePostTab(postTabs.find((tab) => tab.value === localStorage.postTab)));
  //   }
  // }, []);

  // function setList(tab: TPostTab, isActive: boolean) {
  //   return {
  //     As: 'li' as const,
  //     text: tab.name,
  //     // eslint-disable-next-line @typescript-eslint/no-empty-function
  //     onClick: tab.isDisabled ? () => {} : () => onOptionClicked(tab),
  //     isDisabled: tab.isDisabled,
  //     className: [styles.postMenuItem, isActive ? styles.tabActive : ''],
  //   };
  // }

  // function onOptionClicked(value: TPostTab) {
  //   dispatch(updatePostTab(value));
  //   localStorage.setItem('postTab', value.value);
  // }

  // const LIST = [...postTabs.map((tab) => setList(tab, tab.value === tabActive))].map(generateId);

  return (
    <main className={styles.content}>
      {/* <div className={styles.postMenu}>
        <ul className={styles.postMenuList}>
          <GenericList list={LIST} />
        </ul>
      </div> */}
      {children}
    </main>
  );
}
