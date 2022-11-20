import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApiServer } from '../../API/ApiServer';

const emptyError = {
  statusCode: 0,
  message: '',
};

export const fetchSubjects = createAsyncThunk('subjects/fetchSubjects', async (_, { rejectWithValue }) => {
  const response = await ApiServer.getSubjects().then(({ data }) => data);
  if (response.error) throw rejectWithValue(response);
  return response;
});

const initialState = {
  loading: false,
  error: { statusCode: 0, message: '' },
  subjects: [],
  selectedSubject: '',
};

const subjectsSlice = createSlice({
  name: 'subjects',
  initialState,
  reducers: {
    updateSelectedSubject: (state, action) => {
      state.selectedSubject = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = emptyError;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload.payload.map((subject) => ({ id: subject.p00, subject: subject.p01 }));
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) state.error = action.payload.error;
      });
  },
});

export const { updateSelectedSubject } = subjectsSlice.actions;

export default subjectsSlice.reducer;
