import { Reducer } from 'react';
import { IPostData } from '../../hooks/usePostData';
import { TUpdatePostsListData, TUpdatePostsListDataError, TUpdatePostsListDataSuccess, UPDATE_POSTS_LIST_DATA, UPDATE_POSTS_LIST_DATA_ERROR, UPDATE_POSTS_LIST_DATA_SUCCESS } from './action';

export type TPostsList = {
  loader: boolean;
  error: string;
  data: IPostData[];
};

type MyAction = TUpdatePostsListData | TUpdatePostsListDataSuccess | TUpdatePostsListDataError;
export const PostsListDataReducer: Reducer<TPostsList, MyAction> = (state, action) => {
  switch (action.type) {
    case UPDATE_POSTS_LIST_DATA:
      return {
        ...state,
        loader: true,
        error: '',
      };
    case UPDATE_POSTS_LIST_DATA_SUCCESS:
      return {
        ...state,
        loader: false,
        data: [...state.data, ...action.data],
      };
    case UPDATE_POSTS_LIST_DATA_ERROR:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    default:
      return state;
  }
};
