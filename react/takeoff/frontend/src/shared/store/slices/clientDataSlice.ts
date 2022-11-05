import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApiServer, TServerResponseClient } from '../../API/ApiServer';
import { TClientDataMod } from '../../components/ClientFormContainer';
import { generateId } from '../../utils/generateRandomIndex';
import { TError } from '../../utils/ParseError';
import { TRootState } from '../storeRedux';

export type TClientDataState = {
  error: TError;
  loading: boolean;
  clientData: TClientDataMod;
};

const emptyError = { statusCode: 0, message: '' };

export const emptyClientData = {
  surname: { value: '', title: 'Фамилия', type: 'text', isRequire: true, isValid: null },
  name: { value: '', title: 'Имя', type: 'text', isRequire: true, isValid: null },
  lastName: { value: '', title: 'Отчество', type: 'text', isRequire: false, isValid: true },
  contacts: [],
};

const initialState: TClientDataState = {
  loading: false,
  error: emptyError,
  clientData: emptyClientData,
};

export const fetchClientData = createAsyncThunk<
  TServerResponseClient,
  string,
  { rejectValue: TServerResponseClient; state: TRootState }
>('clientData/fetchClientData', async (id, { rejectWithValue, getState }) => {
  const token = getState().userReducer.user.token;
  const response: TServerResponseClient = await ApiServer.getClient(id, token);
  if (response.error) throw rejectWithValue(response);
  return response;
});

const clientDataSlice = createSlice({
  name: 'clientData',
  initialState,
  reducers: {
    updateClientData(state, action: PayloadAction<TClientDataMod>) {
      state.loading = false;
      state.clientData = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchClientData.pending, (state) => {
        state.loading = true;
        state.error = emptyError;
      })
      .addCase(fetchClientData.fulfilled, (state, action) => {
        state.loading = false;
        state.clientData.surname.value = action.payload.payload.surname;
        state.clientData.name.value = action.payload.payload.name;
        state.clientData.lastName.value = action.payload.payload.lastName;
        state.clientData.contacts = action.payload.payload.contacts.map(generateId);
      })
      .addCase(fetchClientData.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) state.error = action.payload.error;
      });
  },
});

export const { updateClientData } = clientDataSlice.actions;

export default clientDataSlice.reducer;
