import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TModalState = {
  isModalOpen: boolean;
};

const initialState: TModalState = {
  isModalOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    updateModalState(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
  },
});

export const { updateModalState } = modalSlice.actions;

export default modalSlice.reducer;
