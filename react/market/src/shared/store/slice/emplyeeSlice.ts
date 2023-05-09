import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejectedWithValue,
} from '@reduxjs/toolkit';
import ApiServer, {
  initialError,
  TServerResponse,
  TServerResponseError,
} from '../../API/ApiServer';
import { TLoginData } from '../../pages/Auth';

const permissions = {
  hr: false,
  warehouse: false,
  analytic: false,
  content: false,
  logistic: false,
};

type TPermissions = typeof permissions;

export interface IEmployeeData {
  username: string;
  permissions: TPermissions;
  fio: string;
  phone: string;
  token: string;
  companyId: number;
}

const emptyEmployeeData = {
  username: '',
  permissions: permissions,
  fio: '',
  phone: '',
  token: '',
  companyId: 0,
};

type TEmployeeState = {
  loading: boolean;
  error: TServerResponseError<TLoginData>;
  employee: IEmployeeData;
};

type TServer = TServerResponse<IEmployeeData, TLoginData>;

const initialState: TEmployeeState = {
  loading: false,
  error: { statusCode: 0, data: initialError },
  employee: emptyEmployeeData,
};

export const fetchEmployeeByLogin = createAsyncThunk<TServer, TLoginData, { rejectValue: TServer }>(
  'employeeData/fetchByLogin',
  async (loginData, { rejectWithValue }): Promise<TServer> => {
    const response: TServer = await ApiServer.login(loginData).then(({ data }) => data);
    if (response.error.statusCode) throw rejectWithValue(response);
    localStorage.setItem('token', response.payload.token);
    return response;
  }
);

export const fetchEmployeeByToken = createAsyncThunk<TServer, string, { rejectValue: TServer }>(
  'employeeData/fetchByToken',
  async (token, { rejectWithValue }) => {
    const response: TServer = await ApiServer.auth(token).then(({ data }) => data);
    if (response.error.statusCode) throw rejectWithValue(response);
    return response;
  }
);

const employeeSlice = createSlice({
  name: 'employeeData',
  initialState,
  reducers: {
    removeError(state) {
      state.error = { statusCode: 0, data: initialError };
    },
    removeEmployeeData(state) {
      state.employee = emptyEmployeeData;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(isPending(fetchEmployeeByLogin, fetchEmployeeByToken), (state) => {
        state.error = { statusCode: 0, data: initialError };
        state.loading = true;
        state.employee = emptyEmployeeData;
      })
      .addMatcher(isFulfilled(fetchEmployeeByLogin, fetchEmployeeByToken), (state, action) => {
        state.loading = false;
        state.employee = action.payload.payload;
      })
      .addMatcher(
        isRejectedWithValue(fetchEmployeeByLogin, fetchEmployeeByToken),
        (state, action) => {
          state.loading = false;
          if (action.payload) state.error = action.payload.error;
        }
      );
  },
});

export const { removeError, removeEmployeeData } = employeeSlice.actions;

export default employeeSlice.reducer;
