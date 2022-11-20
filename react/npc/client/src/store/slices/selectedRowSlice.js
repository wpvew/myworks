import { createSlice } from '@reduxjs/toolkit';

const selectedRowSlice = createSlice({
  name: 'selectedRow',
  initialState: {
    selectedRowId: [],
  },
  reducers: {
    updateSelectedRow(state, action) {
      state.selectedRowId = action.payload;
    },
  },
});

export const { updateSelectedRow } = selectedRowSlice.actions;

export default selectedRowSlice.reducer;
