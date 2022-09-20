import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updataSortSelect } from '../../../store/sortPosts/action';
import { TRootState } from '../../../store/storeRedux';
import { generateId } from '../../../utils/react/generateRandomIndex';
import { Dropdown } from '../../Dropdown';
import { EIcons, Icon } from '../../Icon';
import { EColors, Text } from '../../Text';
import { GenericList } from '../../GenericList/GenericList';
import classNames from 'classnames';
import stylesDropdownList from '../../../dropdownList.css';
import styles from './sortblock.css';

export type TSortSelectValue = {
  value: string;
  name: string;
  icon: string;
};

const sortSelectValues: TSortSelectValue[] = [
  { value: 'new', name: 'New', icon: 'CircleIcon' },
  { value: 'hot', name: 'Hot', icon: 'FireIcon' },
  { value: 'rising', name: 'Rising', icon: 'ArrowUpIcon' },
  { value: 'top', name: 'Top', icon: 'StarIcon' },
  { value: 'best', name: 'Best', icon: 'RocketIcon' },
];
export const defaultSortSelectValue: TSortSelectValue = sortSelectValues.find((value) => value.value === 'new') || { value: 'undefined', name: 'undefined', icon: 'AnonIcon' };

function searchElem(sortVal: string): TSortSelectValue {
  return sortSelectValues.find((value) => value.value === sortVal) || { value: 'undefined', name: 'undefined', icon: 'AnonimIcon' };
}

export function SortBlock() {
  const dispatch = useDispatch();
  const sortValue = useSelector<TRootState, TSortSelectValue>((state) => state.sortSelectValue);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function setList(text: TSortSelectValue, icon: EIcons, iconSize?: number, iconSizeW?: number, iconSizeH?: number) {
    return {
      As: 'li' as const,
      text: (
        <Text size={16} color={EColors.grey99}>
          {text.name}
        </Text>
      ),
      icon: <Icon size={iconSize} sizeW={iconSizeW} sizeH={iconSizeH} name={icon} />,
      onClick: () => onOptionClicked(text.value),
      className: [stylesDropdownList.menuItem],
    };
  }

  const LIST = [
    setList(defaultSortSelectValue, EIcons.circle, 16),
    setList(searchElem('hot'), EIcons.fire, 0, 16, 16),
    setList(searchElem('rising'), EIcons.arrowUp, 16),
    setList(searchElem('top'), EIcons.star, 16),
    setList(searchElem('best'), EIcons.rocket, 0, 16, 16),
  ].map(generateId);

  function onOptionClicked(value: string) {
    dispatch(updataSortSelect(sortSelectValues.find((sortValue) => sortValue.value === value)));
    handleClick();
  }

  const handleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const iconSelect = LIST.find((item) => item.icon.props.name === sortValue.icon)?.icon;
  const arrowClasses = classNames(styles.dropdownArrow, isDropdownOpen && styles.active);

  return (
    <div className={styles.sortBlock}>
      <div className={styles.sort}>
        <button className={styles.sortButton} onClick={handleClick}>
          {iconSelect}
          <Text size={16} color={EColors.grey99}>
            {sortValue.name}
          </Text>
          <span className={arrowClasses}></span>
        </button>
        {isDropdownOpen && (
          <Dropdown onClose={handleClick}>
            <div className={styles.dropdown}>
              <ul className={styles.menuItemsList}>
                <GenericList list={LIST} />
              </ul>
            </div>
          </Dropdown>
        )}
      </div>
    </div>
  );
}
