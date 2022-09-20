import { Reducer } from 'redux';
import { emptyPost } from '../hooks/usePostData';
import { TUpdateCommentAction, TUpdateReplyCommentAction, UPDATE_COMMENT, UPDATE_REPLY_COMMENT } from './comment/action';
import { CommentReducer, TCommentState } from './comment/reducer';
import { emptyUserData, ME_REQUERST, ME_REQUERST_ERROR, ME_REQUERST_SUCCESS, TMeRequestAction, TMeRequestErrorAction, TMeRequestSuccessAction } from './me/action';
import { meReducer, TMeState } from './me/reducer';
import { TUpdatePostDetailsData, TUpdatePostDetailsDataError, TUpdatePostDetailsDataSuccess, UPDATE_POST_DETAILS, UPDATE_POST_DETAILS_ERROR, UPDATE_POST_DETAILS_SUCCESS } from './post/action';
import { PostModalDataReducer, TPostDetails } from './post/reducer';
import { TUpdatePostsListData, TUpdatePostsListDataError, TUpdatePostsListDataSuccess, UPDATE_POSTS_LIST_DATA, UPDATE_POSTS_LIST_DATA_ERROR, UPDATE_POSTS_LIST_DATA_SUCCESS } from './postsList/action';
import { PostsListDataReducer, TPostsList } from './postsList/reducer';
import { TUpdateSearchInput, UPDATE_SEARCH_INPUT } from './searchPosts/action';
import { TUpdateSortSelect, UPDATE_SORT_SELECT } from './sortPosts/action';
import { defaultSortSelectValue, TSortSelectValue } from '../shared/Header/SortBlock';

import { SET_TOKEN, TSetTokenAction } from './token/action';
import { defaultPostTab, TPostTab } from '../shared/Header/PostTabs';
import { TUpdatePostTabs, UPDATE_POST_TABS } from './postTabs/action';
import { TActionsPost, TUpdateActionsPost, UPDATE_ACTIONS_POST } from './actionsPost/action';
import { TUpdateModalStatus, UPDATE_MODAL_STATUS } from './modalStatus/action';

export type TRootState = {
  token: string;
  searchInputValue: string;
  isModalOpened: boolean;
  tab: TPostTab;
  sortSelectValue: TSortSelectValue;
  comment: TCommentState;
  me: TMeState;
  postsListData: TPostsList;
  postDetails: TPostDetails;
  actionsPost: TActionsPost;
};

const initialState: TRootState = {
  token: '',
  searchInputValue: '',
  sortSelectValue: defaultSortSelectValue,
  tab: defaultPostTab,
  isModalOpened: false,
  comment: {
    commentText: '',
    replyCommentText: '',
  },
  me: {
    loading: false,
    error: '',
    data: emptyUserData,
  },
  postsListData: {
    loader: false,
    error: '',
    data: [],
  },
  postDetails: {
    loader: false,
    error: '',
    commentsData: [],
    postData: emptyPost,
  },
  actionsPost: {
    saved: false,
    hidden: false,
  },
};

type MyAction =
  | TSetTokenAction
  | TUpdateCommentAction
  | TUpdateReplyCommentAction
  | TMeRequestAction
  | TMeRequestSuccessAction
  | TMeRequestErrorAction
  | TUpdatePostsListData
  | TUpdatePostsListDataSuccess
  | TUpdatePostsListDataError
  | TUpdatePostDetailsData
  | TUpdatePostDetailsDataSuccess
  | TUpdatePostDetailsDataError
  | TUpdateSearchInput
  | TUpdateSortSelect
  | TUpdatePostTabs
  | TUpdateActionsPost
  | TUpdateModalStatus;
export const rootReducer: Reducer<TRootState, MyAction> = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case UPDATE_SORT_SELECT:
      return {
        ...state,
        sortSelectValue: action.selectValue,
      };
    case UPDATE_SEARCH_INPUT:
      return {
        ...state,
        searchInputValue: action.searchInputValue,
      };
    case UPDATE_POST_TABS:
      return {
        ...state,
        tab: action.tab,
      };
    case UPDATE_ACTIONS_POST:
      return {
        ...state,
        actionsPost: action.actionsPost,
      };
    case UPDATE_MODAL_STATUS:
      return {
        ...state,
        isModalOpened: action.isModalOpened,
      };
    case UPDATE_POSTS_LIST_DATA:
    case UPDATE_POSTS_LIST_DATA_SUCCESS:
    case UPDATE_POSTS_LIST_DATA_ERROR:
      return {
        ...state,
        postsListData: PostsListDataReducer(state.postsListData, action),
      };
    case UPDATE_POST_DETAILS:
    case UPDATE_POST_DETAILS_SUCCESS:
    case UPDATE_POST_DETAILS_ERROR:
      return {
        ...state,
        postDetails: PostModalDataReducer(state.postDetails, action),
      };
    case UPDATE_COMMENT:
    case UPDATE_REPLY_COMMENT:
      return {
        ...state,
        comment: CommentReducer(state.comment, action),
      };
    case ME_REQUERST:
    case ME_REQUERST_SUCCESS:
    case ME_REQUERST_ERROR:
      return {
        ...state,
        me: meReducer(state.me, action),
      };
    default:
      return state;
  }
};
