import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '../../store/storeRedux';
import { EViewport, updateTypeViewport } from '../../store/viewport/action';
import styles from '../../styles/container.scss';

interface IContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: IContainerProps) {
  const [changedViewport, setChangedViewport] = useState<EViewport>();
  const viewport = useSelector<TRootState, EViewport>((state) => state.viewport);
  const dispatch = useDispatch();

  const getViewport = () => {
    if (window.innerWidth <= 480 && viewport !== EViewport.mobile)
      setChangedViewport(EViewport.mobile);
    if (window.innerWidth > 480 && window.innerWidth <= 768 && viewport !== EViewport.table)
      setChangedViewport(EViewport.table);
    if (window.innerWidth > 768 && viewport !== EViewport.desktop)
      setChangedViewport(EViewport.desktop);
  };

  useEffect(() => {
    dispatch(updateTypeViewport(changedViewport));
  }, [changedViewport]);

  useEffect(() => {
    getViewport();
    window.addEventListener('resize', getViewport);
    return () => window.removeEventListener('resize', getViewport);
  }, []);

  return <div className={styles.container}>{children}</div>;
}
