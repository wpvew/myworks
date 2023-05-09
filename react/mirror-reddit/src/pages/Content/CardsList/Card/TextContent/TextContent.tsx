import React from 'react';
import { useSelector } from 'react-redux';
import { TPostsList } from '../../../../../store/postsList/reducer';
import { TRootState } from '../../../../../store/storeRedux';
import { ICardProps } from '../Card';
import { CreatedAt } from './CreatedAt';
import { Title } from './Title';
import { UserLink } from './UserLink';
import { IPostData } from '../../../../../hooks/usePostData';
import { CommentsButton } from '../Controls/CommentsButton';
import { EViewportVersion, useViewportVersion } from '../../../../../hooks/useViewportVersion';
import styles from './textcontent.css';

interface ITitleProps extends Pick<ICardProps, 'postId'> {
  titleAs?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'a';
  noModal?: boolean;
}

export function TextContent({ titleAs, postId, noModal }: ITitleProps) {
  const { data: posts } = useSelector<TRootState, TPostsList>((state) => state.postsListData);
  const [viewportSize] = useViewportVersion();

  const post = noModal ? (posts.find((post) => post.postId === postId) as IPostData) : useSelector<TRootState, IPostData>((state) => state.postDetails.postData);

  return (
    <div className={styles.textContent}>
      {noModal && <div className={styles.commentCount}>{viewportSize >= EViewportVersion.desktop && <CommentsButton postId={postId} />}</div>}
      <div className={styles.metaData}>
        <UserLink userName={post.author} userAvatar={post.avatar} />
        <CreatedAt timeAgo={post.createdAtAgo} />
      </div>
      <Title As={titleAs} title={post.title} clickableZone={noModal && true} postId={postId} />
    </div>
  );
}
