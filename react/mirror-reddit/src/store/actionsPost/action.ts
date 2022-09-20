import { ActionCreator } from 'redux';

export type TActionsPost = {
  saved: boolean;
  hidden: boolean;
};

export const UPDATE_ACTIONS_POST = 'UPDATE_ACTIONS_POST';
export type TUpdateActionsPost = {
  type: typeof UPDATE_ACTIONS_POST;
  actionsPost: TActionsPost;
};
export const updateActionsPost: ActionCreator<TUpdateActionsPost> = (actionsPost: TActionsPost) => ({
  type: UPDATE_ACTIONS_POST,
  actionsPost,
});
