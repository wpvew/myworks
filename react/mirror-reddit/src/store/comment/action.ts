import { ActionCreator } from 'redux';

export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export type TUpdateCommentAction = {
  type: typeof UPDATE_COMMENT;
  text: string;
};
export const updateComment: ActionCreator<TUpdateCommentAction> = (text) => ({
  type: UPDATE_COMMENT,
  text,
});

export const UPDATE_REPLY_COMMENT = 'UPDATE_REPLY_COMMENT';
export type TUpdateReplyCommentAction = {
  type: typeof UPDATE_REPLY_COMMENT;
  text: string;
};
export const updateReplyComment: ActionCreator<TUpdateReplyCommentAction> = (text: string) => ({
  type: UPDATE_REPLY_COMMENT,
  text,
});
