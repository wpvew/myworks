import { RootStateOrAny } from 'react-redux';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

export const SET_TOKEN = 'SET_TOKEN';
export type TSetTokenAction = {
  type: typeof SET_TOKEN;
  token: string;
};
export const setToken: ActionCreator<TSetTokenAction> = (token: string) => ({
  type: SET_TOKEN,
  token,
});

export const saveToken = (): ThunkAction<void, RootStateOrAny, unknown, Action<any>> => (dispatch) => {
  if (localStorage.token) {
    dispatch(setToken(localStorage.token));
  }
};
