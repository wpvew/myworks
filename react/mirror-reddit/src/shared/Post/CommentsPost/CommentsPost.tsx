import React from 'react';
import { ICommentData } from '../../../hooks/usePostData';
import { Comment } from './Comment/Comment';
import styles from './commentspost.css';

export function CommentsPost({ comments, error }: { comments: ICommentData[]; error: string }) {
  return (
    <React.Fragment>
      {error === 'Unauthorized' ? (
        <div className={styles.errorMessage}>Авторизируйтесь, чтобы увидеть комментарии</div>
      ) : error === 'Comments not found' ? (
        <div className={styles.errorMessage}>Комментариев пока нет</div>
      ) : (
        comments.map((comment) => <Comment key={comment.id} comment={comment} error={error} />)
      )}
    </React.Fragment>
  );
}
