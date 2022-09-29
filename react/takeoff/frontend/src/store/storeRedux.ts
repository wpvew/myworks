import { Reducer } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import { SET_TOKEN, TSetTokenAction } from './token/action';
import { TUpdateClientListData, TUpdateClientListDataError, TUpdateClientListDataSuccess, UPDATE_CLIENT_LIST_DATA, UPDATE_CLIENT_LIST_DATA_ERROR, UPDATE_CLIENT_LIST_DATA_SUCCESS } from './clientList/action';
import { ClientListDataReducer, TClientList } from './clientList/reducer';

export type TRootState = {
  token: string;
  clientListDate: TClientList
}
const initialState: TRootState = {
  token: '',
  clientListDate: {
    loader: false,
    error: '',
    isServerData: true,
    data: []
  }
}
type MyAction = TSetTokenAction | TUpdateClientListData | TUpdateClientListDataSuccess | TUpdateClientListDataError;
export const rootReducer: Reducer<TRootState, MyAction> = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case UPDATE_CLIENT_LIST_DATA:
    case UPDATE_CLIENT_LIST_DATA_SUCCESS:
    case UPDATE_CLIENT_LIST_DATA_ERROR:
      return {
        ...state,
        clientListDate: ClientListDataReducer(state.clientListDate, action),
      };
    default:
      return state;
  }
}

const store = configureStore({
  reducer: rootReducer
})
export default store;
