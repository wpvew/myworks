import { configureStore } from '@reduxjs/toolkit';
import subjectsReducer from './slices/subjectsSlice';
import supplyBloodReducer from './slices/supplyBloodSlice';
import selectedRowReducer from './slices/selectedRowSlice';

const store = configureStore({
  reducer: {
    subjectsReducer,
    supplyBloodReducer,
    selectedRowReducer,
  },
});

export default store;
