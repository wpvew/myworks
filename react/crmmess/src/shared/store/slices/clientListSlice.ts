import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  ApiServer,
  TClientDataFromServer,
  TServerResponseClient,
  TServerResponseClientList,
} from '../../API/ApiServer';
import { TError } from '../../utils/ParseError';
import { TRootState } from '../storeRedux';

export type TClientListState = {
  clientList: TClientDataFromServer[];
  error: TError;
  loading: boolean;
  isServerData: boolean;
};

const emptyError = { statusCode: 0, message: '' };

const initialState: TClientListState = {
  loading: false,
  isServerData: true,
  error: emptyError,
  clientList: [],
};

export const getClientList = createAsyncThunk<
  TServerResponseClientList,
  void,
  { rejectValue: TServerResponseClientList; state: TRootState }
>('clientList/getClientList', async (_, { rejectWithValue, getState }) => {
  const token = getState().userReducer.user.token;
  const response: TServerResponseClientList = await ApiServer.getClientList(token);
  if (response.error) throw rejectWithValue(response);
  return response;
});

export const deleteClientItem = createAsyncThunk<
  TServerResponseClient,
  string,
  { rejectValue: TServerResponseClient; state: TRootState }
>('clientList/deleteClientItem', async (id, { rejectWithValue, getState }) => {
  const token = getState().userReducer.user.token;
  const response: TServerResponseClient = await ApiServer.deleteClient(id, token);
  if (response.error) throw rejectWithValue(response);
  return response;
});

const clientListSlice = createSlice({
  name: 'clientList',
  initialState,
  reducers: {
    updateClientListSuccess(state, action: PayloadAction<{ list: TClientDataFromServer[]; isServerData?: boolean }>) {
      state.clientList = action.payload.list;
      if (action.payload.isServerData !== undefined) state.isServerData = action.payload.isServerData;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getClientList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClientList.fulfilled, (state, action) => {
        state.loading = false;
        state.clientList = action.payload.payload;
      })
      .addCase(getClientList.rejected, (state, action) => {
        if (action.payload) state.error = action.payload.error;
      })
      // .addCase(deleteClientItem.pending, (state) => {
      //   state.loading = true;
      // })
      .addCase(deleteClientItem.fulfilled, (state, action) => {
        state.clientList = state.clientList.filter((client) => client._id !== action.payload.payload._id);
      })
      .addCase(deleteClientItem.rejected, (state, action) => {
        if (action.payload) state.error = action.payload.error;
      });
  },
});

export const { updateClientListSuccess } = clientListSlice.actions;

export default clientListSlice.reducer;
