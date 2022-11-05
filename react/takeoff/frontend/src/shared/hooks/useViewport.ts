import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { EViewport, updateViewport } from '../store/slices/viewportSlice';

export const useViewport = () => {
  const [viewport, setViewport] = useState<EViewport>(EViewport.unknown);
  const dispatch = useAppDispatch();

  const getViewport = () => {
    const width = window.innerWidth;
    if (width <= 480 && viewport !== EViewport.mobile) setViewport(EViewport.mobile);
    if (width <= 640 && width > 480 && viewport !== EViewport.minTable) setViewport(EViewport.minTable);
    if (width <= 768 && width > 640 && viewport !== EViewport.table) setViewport(EViewport.table);
    if (width <= 1024 && width > 768 && viewport !== EViewport.maxTable) setViewport(EViewport.maxTable);
    if (width > 1024 && viewport !== EViewport.desktop) setViewport(EViewport.desktop);
  };

  useEffect(() => {
    dispatch(updateViewport(viewport));
  }, [viewport]);

  useEffect(() => {
    getViewport();
    window.addEventListener('resize', getViewport);
    return () => {
      window.removeEventListener('resize', getViewport);
    };
  }, []);
};
