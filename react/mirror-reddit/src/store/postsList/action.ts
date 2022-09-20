import { ActionCreator } from 'redux';
import { IPostData } from '../../hooks/usePostData';

export const UPDATE_POSTS_LIST_DATA = 'UPDATE_POSTS_LIST_DATA';
export type TUpdatePostsListData = {
  type: typeof UPDATE_POSTS_LIST_DATA;
};
export const updataPostsListData: ActionCreator<TUpdatePostsListData> = () => ({
  type: UPDATE_POSTS_LIST_DATA,
});

export const UPDATE_POSTS_LIST_DATA_SUCCESS = 'UPDATE_POSTS_LIST_DATA_SUCCESS';
export type TUpdatePostsListDataSuccess = {
  type: typeof UPDATE_POSTS_LIST_DATA_SUCCESS;
  data: IPostData[];
};
export const updataPostsListDataSuccess: ActionCreator<TUpdatePostsListDataSuccess> = (data: IPostData[]) => ({
  type: UPDATE_POSTS_LIST_DATA_SUCCESS,
  data,
});

export const UPDATE_POSTS_LIST_DATA_ERROR = 'UPDATE_POSTS_LIST_DATA_ERROR';
export type TUpdatePostsListDataError = {
  type: typeof UPDATE_POSTS_LIST_DATA_ERROR;
  error: string;
};
export const updataPostsListDataError: ActionCreator<TUpdatePostsListDataError> = (error: string) => ({
  type: UPDATE_POSTS_LIST_DATA_ERROR,
  error,
});
