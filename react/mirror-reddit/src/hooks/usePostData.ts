import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updataPostDetailsDataAsync } from '../store/post/action';
import { TRootState } from '../store/storeRedux';

export interface ICommentData {
  id: string;
  author: string;
  authorLink: string;
  text: string;
  createdAt: string;
  createdAtAgo: string;
  like: boolean | null;
  rating: number;
  replies: Array<ICommentData> | string;
  avatar?: string;
}

export interface IPostData {
  postId: string;
  author: string;
  authorLink: string;
  avatar?: string;
  title: string;
  text: string;
  image: string;
  rating: number;
  createdAt: string;
  createdAtAgo: string;
  like: boolean | null;
  qtyComments: number;
  hidden: boolean;
  saved: boolean;
  metadata?: string[];
  video?: string;
  swiper?: boolean;
}

export const emptyPost: IPostData = {
  postId: '',
  author: '',
  authorLink: '',
  title: '',
  text: '',
  image: '',
  createdAt: '',
  createdAtAgo: '',
  like: null,
  rating: 0,
  qtyComments: 0,
  hidden: false,
  saved: false,
};

export function usePostData() {
  const { id: srcPost } = useParams() as { id: string; [N: string]: any };

  const dispatch = useDispatch();
  const post = useSelector<TRootState, IPostData>((state) => state.postDetails.postData);
  const comments = useSelector<TRootState, ICommentData[]>((state) => state.postDetails.commentsData);
  const isLoading = useSelector<TRootState, boolean>((state) => state.postDetails.loader);
  const error = useSelector<TRootState, string>((state) => state.postDetails.error);

  useEffect(() => {
    if (srcPost === post.postId) return;
    dispatch(updataPostDetailsDataAsync(srcPost));
  }, [srcPost]);

  return { post, comments, isLoading, error };
}
