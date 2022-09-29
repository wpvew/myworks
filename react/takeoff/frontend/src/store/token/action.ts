import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TRootState } from '../storeRedux';

export const SET_TOKEN = 'SET_TOKEN';
export type TSetTokenAction = {
  type: typeof SET_TOKEN;
  token: string;
};
export const setToken: ActionCreator<TSetTokenAction> = (token: string) => ({
  type: SET_TOKEN,
  token,
});

export const saveToken = (): ThunkAction<void, TRootState, unknown, Action<any>> => (dispatch) => {
  if (localStorage.token) {
    dispatch(setToken(localStorage.token));
  }
};
