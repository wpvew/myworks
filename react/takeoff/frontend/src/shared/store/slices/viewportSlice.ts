import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum EViewport {
  mobile = 'mobile',
  minTable = 'minTable',
  table = 'table',
  maxTable = 'maxTable',
  desktop = 'desktop',
  unknown = 'unknown',
}

export type TViewportState = {
  viewport: EViewport;
};

const initialState: TViewportState = {
  viewport: EViewport.unknown,
};

const viewportSlice = createSlice({
  name: 'viewport',
  initialState,
  reducers: {
    updateViewport(state, action: PayloadAction<EViewport>) {
      state.viewport = action.payload;
    },
  },
});

export const { updateViewport } = viewportSlice.actions;

export default viewportSlice.reducer;
