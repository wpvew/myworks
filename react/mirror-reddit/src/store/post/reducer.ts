import { Reducer } from 'react';
import { emptyPost, ICommentData, IPostData } from '../../hooks/usePostData';
import { TUpdatePostDetailsData, TUpdatePostDetailsDataError, TUpdatePostDetailsDataSuccess, UPDATE_POST_DETAILS, UPDATE_POST_DETAILS_ERROR, UPDATE_POST_DETAILS_SUCCESS } from './action';

export type TPostDetails = {
  loader: boolean;
  error: string;
  postData: IPostData;
  commentsData: ICommentData[];
};

type MyAction = TUpdatePostDetailsData | TUpdatePostDetailsDataSuccess | TUpdatePostDetailsDataError;
export const PostModalDataReducer: Reducer<TPostDetails, MyAction> = (state, action) => {
  switch (action.type) {
    case UPDATE_POST_DETAILS:
      return {
        ...state,
        loader: true,
        error: '',
        postData: emptyPost,
        commentsData: [],
      };
    case UPDATE_POST_DETAILS_SUCCESS:
      return {
        ...state,
        loader: false,
        postData: action.postData,
        commentsData: action.commentsData,
      };
    case UPDATE_POST_DETAILS_ERROR:
      return {
        ...state,
        loader: false,
        error: action.error,
      };
    default:
      return state;
  }
};
