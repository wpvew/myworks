import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { AppDispatch, TRootState } from './storeRedux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;
