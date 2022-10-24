import React from 'react';
import { Display } from './Display';
import { Modal } from './Modal';
import { useNavigate } from 'react-router-dom';
import { Today } from './Today';
import { useSelector } from 'react-redux';
import { TRootState } from '../../store/storeRedux';
import { EViewport } from '../../store/viewport/action';
import { SearchLocation } from '../SearchLocation';
import styles from '../../styles/content.scss';

export function Content() {
  const navigate = useNavigate();
  const viewport = useSelector<TRootState, EViewport>((state) => state.viewport);

  const handleChioceLocation = (value: string) => {
    navigate(`/weather/${value}`, { replace: true, state: { location: value } });
    window.location.reload();
  };

  return (
    <main>
      <div className={styles.content}>
        <div className={styles.display}>
          {viewport === EViewport.desktop && <SearchLocation onChoice={handleChioceLocation} />}
          <Display />
          <Today />
        </div>
        <Modal />
      </div>
    </main>
  );
}
