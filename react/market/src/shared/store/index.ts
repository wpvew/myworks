import { configureStore } from '@reduxjs/toolkit';
import emplyeeSliceReducer from './slice/emplyeeSlice';
import pageSliceReducer from './slice/pageSlice';

const store = configureStore({
  reducer: {
    emplyeeSliceReducer,
    pageSliceReducer,
  },
});

export default store;

export type TRootState = ReturnType<typeof store.getState>;
export type TAppDispatch = typeof store.dispatch;
