import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ICommentData } from '../../../../hooks/usePostData';
import { updateReplyComment } from '../../../../store/comment/action';
import { KarmaCounterContainer } from '../../../Content/CardsList/Card/Controls/KarmaCounterContainer';
import { CreatedAt } from '../../../Content/CardsList/Card/TextContent/CreatedAt';
import { UserLink } from '../../../Content/CardsList/Card/TextContent/UserLink';
import { EIcons, Icon } from '../../../Icon';
import { ReplyFormContainer } from '../../../ReplyFormContainer';
import { EColors, Text } from '../../../Text';
import { CommentsPost } from '../CommentsPost';
import styles from './comment.css';

export function Comment({ comment, error }: { comment: ICommentData; error: string }) {
  const [isOpenFormCommentReply, setIsOpenFormCommentReply] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleClickReply = (name: string) => {
    setIsOpenFormCommentReply(!isOpenFormCommentReply);
    dispatch(updateReplyComment(`Dear ${name}, `));
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className={styles.commentItem}>
      <div className={styles.leftBar}>
        <KarmaCounterContainer id={comment.id} like={comment.like} isUserRating={true} rating={comment.rating} classesAddition={styles.commentKarma} />
        <div className={styles.followLine}></div>
      </div>

      <div className={styles.header}>
        <UserLink userName={comment.author} userAvatar={comment.avatar} />
        <CreatedAt timeAgo={comment.createdAtAgo} />
      </div>

      <div className={styles.content}>
        <Text size={14} color={EColors.black}>
          {comment.text}
        </Text>
      </div>

      <div className={styles.actions}>
        <button
          onClick={() => {
            handleClickReply(comment.author);
            toggleEditing();
          }}
          className={styles.actionsBtn}
        >
          <Icon name={EIcons.message} size={14} />
          <Text size={14} mobileSize={12} color={EColors.black}>
            Ответить
          </Text>
        </button>
        <button className={styles.actionsBtn}>
          <Icon name={EIcons.share} sizeW={12} sizeH={14} />
          <Text size={14} mobileSize={12} color={EColors.black}>
            Поделиться
          </Text>
        </button>
        <button className={styles.actionsBtn}>
          <Icon name={EIcons.warning} sizeW={16} sizeH={14} />
          <Text size={14} mobileSize={12} color={EColors.black}>
            Пожаловаться
          </Text>
        </button>
      </div>
      {isOpenFormCommentReply && (
        <ReplyFormContainer
          onSubmit={() => setIsOpenFormCommentReply(!isOpenFormCommentReply)}
          isEditing={isEditing}
          commentId={comment.id}
          onClickCancel={() => {
            setTimeout(() => {
              toggleEditing();
              setIsOpenFormCommentReply(false);
            }, 0);
          }}
        />
      )}
      {comment.replies instanceof Array && <CommentsPost comments={comment.replies} error={error} />}
    </div>
  );
}
