import { useEffect } from 'react';
import { getClientList } from '../store/slices/clientListSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export function useClientListData() {
  const { clientList, loading, error } = useAppSelector((state) => state.clientListReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getClientList());
  }, []);

  return { clientList, loading, error };
}
