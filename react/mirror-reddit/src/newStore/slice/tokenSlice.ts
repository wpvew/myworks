import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export type TTokenState = {
  token: string;
};

export const fetchToken = createAsyncThunk<any, string>('token/fetchToken', async (token) => {
  // console.log(token);
  return token;
});

const initialState: TTokenState = {
  token: 'asd',
};

const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      console.log('asd');
      console.log(action.payload);
      // state.token = action.payload;
    });
  },
});

export default tokenSlice.reducer;
