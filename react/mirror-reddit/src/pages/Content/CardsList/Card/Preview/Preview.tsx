import React from 'react';
import { useSelector } from 'react-redux';
import { IPostData } from '../../../../../hooks/usePostData';
import { TPostsList } from '../../../../../store/postsList/reducer';
import { TRootState } from '../../../../../store/storeRedux';
import styles from './preview.css';

interface IPreviewProps {
  postId: string;
}

export function Preview({ postId }: IPreviewProps) {
  const { data: posts } = useSelector<TRootState, TPostsList>((state) => state.postsListData);
  const post = posts.find((post) => post.postId === postId) as IPostData;

  return (
    <div className={styles.preview}>
      <img src={post.image !== 'self' ? post.image : 'https://plusworld.ru/wp-content/uploads/2021/01/reddit.jpg'} alt='preview' className={styles.previewImg} />
    </div>
  );
}
