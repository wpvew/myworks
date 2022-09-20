import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchInput } from '../../../store/searchPosts/action';
import { TRootState } from '../../../store/storeRedux';
import { EIcons, Icon } from '../../Icon';
import styles from './searchblock.css';

export function SearchBlock() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const valueInput = useSelector<TRootState, string>((state) => state.searchInputValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateSearchInput(value));
  };

  useEffect(() => {
    !valueInput && setValue('');
  }, [valueInput]);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.searchBlock}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input className={styles.searchInput} value={value} onChange={handleChange} type='text' placeholder='Поиск по постам' />
        <Icon name={EIcons.search} size={15} />
      </form>
    </div>
  );
}
