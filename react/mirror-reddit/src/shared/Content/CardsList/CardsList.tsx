import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IPostData } from '../../../hooks/usePostData';
import { usePostsListData } from '../../../hooks/usePostsListData';
import { updateModalStatus } from '../../../store/modalStatus/action';
import { TPostsList } from '../../../store/postsList/reducer';
import { TRootState } from '../../../store/storeRedux';
import { Card } from './Card/Card';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import styles from './cardslist.css';

export interface IPostsList {
  posts: IPostData[];
  loading: boolean;
  errorLoading: string;
  bottomOfList: React.RefObject<HTMLDivElement>;
  loadingMore: boolean;
  onClick: () => void;
}

export function CardsList() {
  const token = useSelector<TRootState, string>((state) => state.token);
  const { bottomOfList, loadingMore, onClick } = usePostsListData() as IPostsList;
  const { data: posts, loader, error } = useSelector<TRootState, TPostsList>((state) => state.postsListData);

  const params = useParams() as { id: string; [N: string]: any };
  const isModalOpened = useSelector<TRootState, boolean>((state) => state.isModalOpened);
  const dispatch = useDispatch();
  useEffect(() => {
    params.id ? dispatch(updateModalStatus(true)) : dispatch(updateModalStatus(false));
  }, [params.id]);

  const classesCardList = classNames(styles.cardsList, isModalOpened && styles.modalActive);

  return (
    // <OverlayScrollbarsComponent className='os-theme-dark'>
    <ul className={classesCardList}>
      {posts.length === 0 && !loader && !error && token && (
        <div role='alert' style={{ textAlign: 'center' }}>
          Посты не найдены
        </div>
      )}
      {posts.length === 0 && !loader && !error && !token && (
        <div role='alert' style={{ textAlign: 'center' }}>
          Необходимо авторизоваться
        </div>
      )}

      {posts.map((post) => {
        return (
          <Card
            key={post.postId}
            postId={post.postId}
            title={post.title}
            author={post.author}
            userAvatar={post.avatar}
            like={post.like}
            rating={post.rating}
            text={post.text}
            image={post.image}
            createdAt={post.createdAt}
            createdAtAgo={post.createdAtAgo}
          />
        );
      })}

      <div ref={bottomOfList} />

      {!loadingMore && (
        <button className={styles.btnLoadingMore} type='button' onClick={onClick}>
          Загрузить еще
        </button>
      )}

      {loader && (
        <div role='alert' style={{ textAlign: 'center' }}>
          Loading...
        </div>
      )}

      {error && (
        <div role='alert' style={{ textAlign: 'center' }}>
          {error}
        </div>
      )}
    </ul>
    // {/* </OverlayScrollbarsComponent> */}
  );
}
