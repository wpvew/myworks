import { ActionCreator } from 'redux';
import { TClientData } from '../../shared/components/Layout/Content/ClientList';

export const UPDATE_CLIENT_LIST_DATA = 'UPDATE_CLIENT_LIST_DATA';
export type TUpdateClientListData = {
  type: typeof UPDATE_CLIENT_LIST_DATA;
};
export const updataClientListData: ActionCreator<TUpdateClientListData> = () => ({
  type: UPDATE_CLIENT_LIST_DATA,
});

export const UPDATE_CLIENT_LIST_DATA_SUCCESS = 'UPDATE_CLIENT_LIST_DATA_SUCCESS';
export type TUpdateClientListDataSuccess = {
  type: typeof UPDATE_CLIENT_LIST_DATA_SUCCESS;
  isServerData: boolean;
  data: TClientData[];
};
export const updataClientListDataSuccess: ActionCreator<TUpdateClientListDataSuccess> = (data: TClientData[], isServerData: boolean = true) => ({
  type: UPDATE_CLIENT_LIST_DATA_SUCCESS,
  isServerData,
  data,
});

export const UPDATE_CLIENT_LIST_DATA_ERROR = 'UPDATE_CLIENT_LIST_DATA_ERROR';
export type TUpdateClientListDataError = {
  type: typeof UPDATE_CLIENT_LIST_DATA_ERROR;
  error: string;
};
export const updataClientListDataError: ActionCreator<TUpdateClientListDataError> = (error: string) => ({
  type: UPDATE_CLIENT_LIST_DATA_ERROR,
  error,
});
