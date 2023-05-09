import { configureStore } from '@reduxjs/toolkit';
import tokenSliceReducer from './slice/tokenSlice';

const store = configureStore({
  reducer: {
    tokenSliceReducer,
  },
});

export default store;

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
