import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePostTab } from '../../../store/postTabs/action';
import { TRootState } from '../../../store/storeRedux';
import { generateId } from '../../../utils/react/generateRandomIndex';
import { Dropdown } from '../../Dropdown';
import { GenericList } from '../../GenericList/GenericList';
import { EColors, Text } from '../../Text';
import stylesDropdownList from '../../../dropdownList.css';
import styles from './posttabs.css';
import { EViewportVersion, useViewportVersion } from '../../../hooks/useViewportVersion';
import { updateSearchInput } from '../../../store/searchPosts/action';

export type TPostTab = {
  value: string;
  name: string;
  isDisabled?: boolean;
};

const postTabs: TPostTab[] = [
  { value: 'all', name: 'Все' },
  { value: 'viewed', name: 'Просмотренные', isDisabled: true },
  { value: 'saved', name: 'Сохраненные' },
  { value: 'my', name: 'Мои посты', isDisabled: true },
  { value: 'commented', name: 'Прокомментированные', isDisabled: true },
];
export const defaultPostTab = postTabs.find((tab) => tab.value === 'all') || { value: 'undefined', name: 'undefined' };

export function PostTabs() {
  const dispatch = useDispatch();
  const [viewportVersion] = useViewportVersion();
  const tabActive = useSelector<TRootState, TPostTab>((state) => state.tab);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (localStorage.postTab) {
      dispatch(updatePostTab(postTabs.find((tab) => tab.value === localStorage.postTab)));
    }
  }, []);

  function setList(tab: TPostTab, isActive: boolean) {
    return {
      As: 'li' as const,
      text: tab.name,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onClick: tab.isDisabled ? () => {} : () => onOptionClicked(tab),
      isDisabled: tab.isDisabled,
      className: [styles.postTabsItem, isDropdownOpen ? stylesDropdownList.menuItem : '', isActive ? styles.tabActive : ''],
    };
  }

  function onOptionClicked(value: TPostTab) {
    // dispatch(updateSearchInput(''));
    dispatch(updatePostTab(value));
    localStorage.setItem('postTab', value.value);
  }

  const LIST = [...postTabs.map((tab) => setList(tab, tab.value === tabActive.value))].map(generateId);

  const handleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const arrowClasses = classNames(styles.dropdownArrow, isDropdownOpen && styles.active);

  return (
    <div className={styles.postTabs}>
      {viewportVersion < EViewportVersion.table ? (
        <button onClick={handleClick} className={styles.tabSelected}>
          <Text size={16} color={EColors.grey99}>
            {tabActive.name}
          </Text>
          <span className={arrowClasses}></span>
        </button>
      ) : (
        <ul className={styles.postTabsList}>
          <GenericList list={LIST} />
        </ul>
      )}
      {isDropdownOpen && viewportVersion < EViewportVersion.table && (
        <Dropdown onClose={handleClick}>
          <div className={styles.dropdown}>
            <ul className={styles.postTabsList}>
              <GenericList list={LIST} />
            </ul>
          </div>
        </Dropdown>
      )}
    </div>
  );
}
