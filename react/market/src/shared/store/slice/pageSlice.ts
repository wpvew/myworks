import { createSlice } from '@reduxjs/toolkit';

type TPageState = {
  name: string;
};

const initialState: TPageState = {
  name: '',
};

const pageSlice = createSlice({
  name: 'pageData',
  initialState,
  reducers: {
    updatePage(state, action) {
      state.name = action.payload;
    },
  },
});

export const { updatePage } = pageSlice.actions;

export default pageSlice.reducer;
