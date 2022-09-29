import { Reducer } from 'react';
import { TClientData } from '../../shared/components/Layout/Content/ClientList';
import { TUpdateClientListData, TUpdateClientListDataError, TUpdateClientListDataSuccess, UPDATE_CLIENT_LIST_DATA, UPDATE_CLIENT_LIST_DATA_ERROR, UPDATE_CLIENT_LIST_DATA_SUCCESS } from './action';

export type TClientList = {
  loader: boolean;
  error: string;
  isServerData: boolean;
  data: TClientData[];
};

type MyAction = TUpdateClientListData | TUpdateClientListDataSuccess | TUpdateClientListDataError;
export const ClientListDataReducer: Reducer<TClientList, MyAction> = (state, action) => {
  switch (action.type) {
    case UPDATE_CLIENT_LIST_DATA:
      return {
        ...state,
        loader: true,
        error: '',
      };
    case UPDATE_CLIENT_LIST_DATA_SUCCESS:
      return {
        ...state,
        loader: false,
        isServerData: action.isServerData,
        data: action.data,
        // data: [...state.data, ...action.data],
      };
    case UPDATE_CLIENT_LIST_DATA_ERROR:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    default:
      return state;
  }
};
