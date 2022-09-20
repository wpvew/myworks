import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { TRootState } from '../store/storeRedux';
import { getCreatedAtAgo } from '../utils/js/getCreatedAtAgo';
import { ApiServer } from '../API/ApiServer';
import { updataPostsListData, updataPostsListDataError, updataPostsListDataSuccess } from '../store/postsList/action';
import { IPostData } from './usePostData';
import { updateSearchInput } from '../store/searchPosts/action';
import { updatePostTab } from '../store/postTabs/action';

export interface IUserAvatars {
  name: string;
  avatar: string;
}

enum EPostList {
  search = 'search',
  sort = 'sort',
  tabs = 'tabs',
}

export function usePostsListData() {
  const store = useStore<TRootState>();
  const token = useSelector<TRootState, string>((state) => state.token);
  const myUserName = useSelector<TRootState, string>((state) => state.me.data.username);
  const selectSortValue = useSelector<TRootState, string>((state) => state.sortSelectValue.value);
  const searchValueInput = useSelector<TRootState, string>((state) => state.searchInputValue);
  const postTabs = useSelector<TRootState, string>((state) => state.tab.value);
  const dispatch = useDispatch();
  const [nextAfter, setNextAfter] = useState('');
  const [countLoading, setCountLoading] = useState(0);
  const [postList, setPostList] = useState<EPostList>(EPostList.tabs);
  const [loadingMore, setLoadingMore] = useState(true);
  const bottomOfList = useRef<HTMLDivElement>(null);

  async function loadPostsList(change: boolean) {
    dispatch(updataPostsListData());
    if (change) {
      store.getState().postsListData.data = [];
    }
    switch (postList) {
      case EPostList.search:
        await ApiServer.getSearchedPostsList(searchValueInput, nextAfter, token).then(
          ({
            data: {
              data: { after, children },
            },
          }) => renderPostsList(after, children)
        );
        break;
      case EPostList.sort:
        await ApiServer.getSortedPostsList(selectSortValue, nextAfter, token).then(
          ({
            data: {
              data: { after, children },
            },
          }) => renderPostsList(after, children)
        );
        break;
      case EPostList.tabs:
        if (postTabs === 'all') {
          await ApiServer.getSortedPostsList(selectSortValue, nextAfter, token).then(
            ({
              data: {
                data: { after, children },
              },
            }) => renderPostsList(after, children)
          );
        } else {
          await ApiServer.getTabedPostsList(myUserName || localStorage.username, postTabs, token).then(
            ({
              data: {
                data: { after, children },
              },
            }) => renderPostsList(after, children)
          );
        }
        break;
    }
  }

  function renderPostsList(after: string, children: []) {
    try {
      Promise.all(getAvatar(children)).then((avatars) => {
        const userAvatars = avatars.map(
          ({ data: { data } }): IUserAvatars => ({
            name: data.name,
            avatar: data.snoovatar_img || data.icon_img,
          })
        );

        setNextAfter(after);
        dispatch(updataPostsListDataSuccess(createObjPost(children, userAvatars)));
      });
    } catch (error) {
      dispatch(updataPostsListDataError(String(error)));
    }
  }

  function createObjPost(arr: Array<Record<string, any>>, avatars: IUserAvatars[]): Array<IPostData> {
    return arr.map(({ data }: Record<string, any>): IPostData => {
      return {
        postId: data['id'],
        title: data['title'],
        author: data['author'],
        authorLink: `https://www.reddit.com/user/${data['author']}`,
        avatar: avatars.find((item) => item.name === data['author'])?.avatar,
        image: data['thumbnail'],
        like: data['likes'],
        text: data['selftext'],
        rating: data['ups'],
        createdAt: new Date(+(data['created'] + '000')).toLocaleString(),
        createdAtAgo: getCreatedAtAgo(data['created']),
        hidden: data['hidden'],
        saved: data['saved'],
        qtyComments: data['num_comments'],
      };
    });
  }

  function getAvatar<T extends Array<IPostData>>(data: T): Array<Record<string, any>> {
    return data.map(async ({ data }: Record<string, any>) => {
      return await ApiServer.getAvatar(data.author, token);
    });
  }

  useEffect(() => {
    setPostList(EPostList.search);
    dispatch(updatePostTab({ value: 'all', name: 'Все' }));
  }, [searchValueInput]);
  useEffect(() => {
    dispatch(updateSearchInput(''));
    dispatch(updatePostTab({ value: 'all', name: 'Все' }));
    setPostList(EPostList.sort);
  }, [selectSortValue]);
  useEffect(() => {
    // dispatch(updateSearchInput(''));
    setPostList(EPostList.tabs);
  }, [postTabs]);

  useEffect(() => {
    if (countLoading) {
      setNextAfter('');
    }
  }, [selectSortValue, searchValueInput, postTabs]);

  useEffect(() => {
    if (!nextAfter && countLoading) {
      setCountLoading(1);
      setLoadingMore(true);
      loadPostsList(true);
    }
  }, [nextAfter]);

  useEffect(() => {
    if (!token || token === 'undefined') return;

    if (!countLoading) {
      setLoadingMore(true);
      loadPostsList(false);
      setCountLoading(1);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && countLoading < 3 && countLoading > 0 && nextAfter) {
          setCountLoading(countLoading + 1);
          loadPostsList(false);
        } else if (countLoading >= 3) {
          setLoadingMore(false);
        }
      },
      { rootMargin: '10px' }
    );

    if (bottomOfList.current) {
      observer.observe(bottomOfList.current);
    }

    return () => {
      if (bottomOfList.current) {
        observer.unobserve(bottomOfList.current);
      }
    };
  }, [nextAfter, loadingMore, token]);

  const onClick = () => {
    setCountLoading(0);
    setLoadingMore(true);
  };

  return { loadingMore, bottomOfList, onClick };
}
