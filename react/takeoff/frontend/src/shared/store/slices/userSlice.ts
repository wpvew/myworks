import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiServer, TServerResponseUser } from '../../API/ApiServer';
import { TAuthData } from '../../components/Layout/Authorization';
import { TError } from '../../utils/ParseError';

type TUserData = {
  username: string;
  token: string;
  isAdmin: boolean;
};
export type TUserState = {
  user: TUserData;
  loading: boolean;
  error: TError;
};

export const fetchUserByLogin = createAsyncThunk<TServerResponseUser, TAuthData, { rejectValue: TServerResponseUser }>(
  'user/fetchUserByLogin',
  async (loginData, { rejectWithValue }) => {
    const response: TServerResponseUser = await ApiServer.login(loginData);
    if (response.error) throw rejectWithValue(response);
    return response;
  }
);
export const fetchUserByToken = createAsyncThunk<TServerResponseUser, string, { rejectValue: TServerResponseUser }>(
  'user/fetchUserByToken',
  async (token, { rejectWithValue }) => {
    const response: TServerResponseUser = await ApiServer.authentication(token);
    if (response.error) throw rejectWithValue(response);
    return response;
  }
);

const initialState: TUserState = {
  user: {
    username: '',
    token: '',
    isAdmin: false,
  },
  loading: false,
  error: { statusCode: 0, message: '' },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeToken(state) {
      state.user.token = '';
    },
  },

  extraReducers(builder) {
    builder
      .addCase(fetchUserByLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserByToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserByLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.payload;
        localStorage.setItem('token', state.user.token);
      })
      .addCase(fetchUserByToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.payload;
        localStorage.setItem('token', state.user.token);
      })
      .addCase(fetchUserByLogin.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) state.error = action.payload.error;
      })
      .addCase(fetchUserByToken.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) state.error = action.payload.error;
      });
  },
});

export const { removeToken } = userSlice.actions;

export default userSlice.reducer;
