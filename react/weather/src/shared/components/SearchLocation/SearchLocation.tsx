import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ApiServer } from '../../API/ApiServer';
import { generateId } from '../../utils/generateRandomIndex';
import { validationString } from '../../utils/validation';
import { TDropdownList } from '../../pages/Locations';
import styles from '../../styles/searchlocation.scss';

interface ISearchContainerProps {
  onChoice: (value: string) => void;
  onClose?: () => void;
}

export function SearchLocation({ onClose, onChoice }: ISearchContainerProps) {
  const [inputValue, setInputValue] = useState('');
  const [dropList, setDropdownList] = useState<Array<TDropdownList>>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.target instanceof Node && !ref.current?.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      setDropdownList([]);
      setInputValue('');
      document.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.length) {
        ApiServer.getCities(inputValue)
          .then(({ data: { data } }: { data: { data: Array<Record<'city', string>> } }) => {
            setDropdownList(data.map((item) => ({ location: item.city })).map(generateId));
          })
          .catch(console.log);
      } else {
        setDropdownList([]);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    dropList.length ? setIsDropdownOpen(true) : setIsDropdownOpen(false);
  }, [dropList]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(validationString(e.target.value));
  };
  return (
    <div className={styles.searchLocation}>
      <div className={styles.inputGroup}>
        <input
          value={inputValue}
          onChange={handleChangeInput}
          className={styles.input}
          type='text'
          placeholder='Search'
        />
        <button onClick={onClose} className={styles.cancelBtn}>
          cancel
        </button>
      </div>
      {isDropdownOpen && (
        <div ref={ref} className={styles.dropdown}>
          <ul className={styles.searchLsit}>
            {dropList.map((item) => {
              return (
                <li className={styles.searchItem} key={item.id}>
                  <button onClick={() => onChoice(item.location)} className={styles.searchBtn}>
                    {item.location}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
