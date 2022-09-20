import { ActionCreator } from 'redux';
import { TPostTab } from '../../shared/Header/PostTabs';

export const UPDATE_POST_TABS = 'UPDATE_POST_TABS';
export type TUpdatePostTabs = {
  type: typeof UPDATE_POST_TABS;
  tab: TPostTab;
};
export const updatePostTab: ActionCreator<TUpdatePostTabs> = (tab: TPostTab) => ({
  type: UPDATE_POST_TABS,
  tab,
});
