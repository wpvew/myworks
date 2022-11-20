import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiServer } from '../../API/ApiServer';
import { generateId } from '../../utils/generateRandomIndex';
import { updateSelectedRow } from './selectedRowSlice';
import { updateSelectedSubject } from './subjectsSlice';

const emptyError = {
  statusCode: 0,
  message: '',
};

export const fetchSupplyBlood = createAsyncThunk(
  'supplyBlood/fetchSupplyBlood',
  async (id, { rejectWithValue, dispatch, getState }) => {
    const response = await ApiServer.getSupplyBloodTable(id || getState().subjectsReducer.selectedSubject).then(
      ({ data }) => {
        if (id) dispatch(updateSelectedSubject(id));
        return data;
      }
    );
    if (response.error) throw rejectWithValue(response);
    return response;
  }
);

export const fetchCreateNewRow = createAsyncThunk(
  'supplyBlood/fetchCreateNewRow',
  async (_, { rejectWithValue, getState, dispatch }) => {
    const fkKey = getState().subjectsReducer.selectedSubject;
    const response = await ApiServer.getSupplyRow({ fk_r1022_p00: fkKey }).then(({ data }) => data);
    if (response.error) throw rejectWithValue(response);
    return response;
  }
);
export const fetchSaveSupplyBlood = createAsyncThunk(
  'supplyBlood/fetchSaveSupplyBlood',
  async (_, { rejectWithValue, getState, dispatch }) => {
    const newSupplyBlood = getState().supplyBloodReducer.supplyBlood.map((item) => ({
      ...item,
      controlSum: Object.values(item).reduce((element, total) => String(element) + total, ''),
    }));

    const deleted = getState()
      .supplyBloodReducer.supplyBloodWithContollSum.filter((itemWithSum) => {
        return !getState().supplyBloodReducer.supplyBlood.some((item) => itemWithSum.id === item.id);
      })
      .map((item) => item.id);

    const updated = newSupplyBlood
      .filter((itemWithSum) => {
        return getState().supplyBloodReducer.supplyBloodWithContollSum.some(
          (item) => itemWithSum.id === item.id && itemWithSum.controlSum !== item.controlSum
        );
      })
      .map((item) => {
        const { controlSum, ...rest } = item;
        return rest;
      });

    const created = getState().supplyBloodReducer.supplyBlood.filter((itemWithSum) => {
      return !getState().supplyBloodReducer.supplyBloodWithContollSum.some((item) => itemWithSum.id === item.id);
    });

    function existChangesForApi() {
      const api = [];
      if (created.length) api.push(ApiServer.create(created));
      if (updated.length) api.push(ApiServer.update(updated));
      if (deleted.length) api.push(ApiServer.delete(deleted));
      return api;
    }

    const response = await Promise.all(existChangesForApi()).then((res) => {
      const errors = res.map((item) => item.data).map((element) => element.error);
      if (errors.every((error) => !error) && res.length) {
        dispatch(fetchSupplyBlood());
      } else {
        const fillErrors = errors.map((error) => error.message?.errors.map((error) => error.message)).flat();
        const uniqueErrors = Array.from(new Set(fillErrors));
        return uniqueErrors;
      }
    });
    if (response.length) throw rejectWithValue(response);
  }
);
export const fetchRemoveRow = createAsyncThunk('supplyBlood/fetchRemoveRow', async (_, { getState, dispatch }) => {
  dispatch(removeRow(getState().selectedRowReducer.selectedRowId));
  dispatch(updateSelectedRow([]));
});

const initialState = {
  loading: false,
  error: emptyError,
  supplyBlood: [],
  supplyBloodWithContollSum: [],
};

const supplyBloodSlice = createSlice({
  name: 'supplyBlood',
  initialState,
  reducers: {
    updateRow: (state, action) => {
      const newRow = action.payload;
      const newRowData = state.supplyBlood;
      const index = newRowData.findIndex((element) => element.id === newRow.id);
      newRowData.splice(index, 1, newRow);
      state.supplyBlood = newRowData;
    },
    removeRow: (state, action) => {
      state.supplyBlood = state.supplyBlood.filter((item) => !action.payload.includes(item.id));
      state.error = emptyError;
    },
    clearSupplyBlood: (state, action) => {
      state.supplyBlood = [];
      state.supplyBloodWithContollSum = [];
      state.error = emptyError;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSupplyBlood.pending, (state) => {
        state.loading = true;
        state.error = emptyError;
      })
      .addCase(fetchSupplyBlood.fulfilled, (state, action) => {
        state.loading = false;
        state.supplyBlood = action.payload.payload;
        state.supplyBloodWithContollSum = action.payload.payload.map((item) => ({
          ...item,
          controlSum: Object.values(item).reduce((element, total) => String(element) + total, ''),
        }));
      })
      .addCase(fetchSupplyBlood.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) state.error = action.payload.error;
      })
      .addCase(fetchCreateNewRow.fulfilled, (state, action) => {
        state.supplyBlood = [...state.supplyBlood, generateId(action.payload.payload)];
      })
      .addCase(fetchSaveSupplyBlood.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) state.error.message = action.payload;
      });
  },
});

export const { updateRow, removeRow, clearSupplyBlood } = supplyBloodSlice.actions;

export default supplyBloodSlice.reducer;
