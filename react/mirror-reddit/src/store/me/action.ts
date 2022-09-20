import axios from 'axios';
import { RootStateOrAny } from 'react-redux';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

export interface IUserData {
  username: string;
  userLink: string;
  avatar: string;
}
export const emptyUserData = {
  username: '',
  userLink: '',
  avatar: '',
};

export const ME_REQUERST = 'ME_REQUERST';
export const ME_REQUERST_SUCCESS = 'ME_REQUERST_SUCCESS';
export const ME_REQUERST_ERROR = 'ME_REQUERST_ERROR';

export type TMeRequestAction = {
  type: typeof ME_REQUERST;
};
export type TMeRequestSuccessAction = {
  type: typeof ME_REQUERST_SUCCESS;
  data: IUserData;
};
export type TMeRequestErrorAction = {
  type: typeof ME_REQUERST_ERROR;
  error: string;
};

export const meRequest: ActionCreator<TMeRequestAction> = () => ({
  type: ME_REQUERST,
});

export const meRequestSucces: ActionCreator<TMeRequestSuccessAction> = (data: IUserData) => ({
  type: ME_REQUERST_SUCCESS,
  data,
});
export const meRequestError: ActionCreator<TMeRequestErrorAction> = (error: string) => ({
  type: ME_REQUERST_ERROR,
  error,
});

export const meRequestAsync = (): ThunkAction<void, RootStateOrAny, unknown, Action<any>> => (dispatch, getState) => {
  dispatch(meRequest());
  axios
    .get('https://oauth.reddit.com/api/v1/me', {
      headers: { Authorization: `Bearer ${getState().token}` },
    })
    .then((response) => {
      const userData = response.data;
      const myUserData = {
        username: userData.name,
        userLink: `https://www.reddit.com/user/${userData.name}`,
        avatar: userData.snoovatar_img,
      };
      localStorage.setItem('username', myUserData.username);
      dispatch(meRequestSucces(myUserData));
    })
    .catch((error) => {
      console.log(error);
      dispatch(meRequestError(String(error)));
    });
};
