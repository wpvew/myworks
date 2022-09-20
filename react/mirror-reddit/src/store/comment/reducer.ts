import { Reducer } from 'react';
import { TUpdateCommentAction, TUpdateReplyCommentAction, UPDATE_COMMENT, UPDATE_REPLY_COMMENT } from './action';

export type TCommentState = {
  commentText: string;
  replyCommentText: string;
};

type MyAction = TUpdateCommentAction | TUpdateReplyCommentAction;
export const CommentReducer: Reducer<TCommentState, MyAction> = (state, action) => {
  switch (action.type) {
    case UPDATE_REPLY_COMMENT:
      return {
        ...state,
        replyCommentText: action.text,
      };
    case UPDATE_COMMENT:
      return {
        ...state,
        commentText: action.text,
      };
    default:
      return state;
  }
};
