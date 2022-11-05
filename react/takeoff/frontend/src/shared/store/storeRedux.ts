import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './slices/modalSlice';
import userReducer from './slices/userSlice';
import clientListReducer from './slices/clientListSlice';
import clientDataReducer from './slices/clientDataSlice';
import viewportReducer from './slices/viewportSlice';

const store = configureStore({
  reducer: {
    userReducer,
    clientListReducer,
    modalReducer,
    clientDataReducer,
    viewportReducer,
  },
});

export default store;

export type TRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
