import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApiServer } from '../../API/ApiServer';
import { ICommentData } from '../../hooks/usePostData';
import { IUserData } from '../../store/me/action';
import { updataPostDetailsDataSuccess } from '../../store/post/action';
import { TPostDetails } from '../../store/post/reducer';
import { TRootState } from '../../store/storeRedux';
import { CommentForm } from '../CommentForm/CommentForm';

interface IReplyFormContainer {
  isEditing: boolean;
  commentId: string;
  onClickCancel: () => void;
  onSubmit: () => void;
}

export const ReplyFormContainer = ({ isEditing, onClickCancel, onSubmit, commentId }: IReplyFormContainer) => {
  const token = useSelector<TRootState, string>((state) => state.token);
  const dispatch = useDispatch();
  const { commentsData: comments, postData: post, loader, error } = useSelector<TRootState, TPostDetails>((state) => state.postDetails);
  const userData = useSelector<TRootState, IUserData>((state) => state.me.data);
  // const value = useSelector<TRootState, string>(state => state.replyCommentText);
  // const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // dispatch(updateReplyComment(e.target.value));
    setValue(e.target.value);
  };

  function injectNewComment(comments: ICommentData[], newComment: ICommentData) {
    let found = false;
    return comments.map((comment) => {
      if (comment.id === commentId) {
        found = true;
        comment.replies = comment.replies instanceof Array ? [...comment.replies, newComment] : [newComment];
      }
      if (comment.replies instanceof Array && !found) {
        injectNewComment(comment.replies, newComment);
      }
      return comment;
    });
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    ApiServer.sendComment(`t1_${commentId}`, value, token).then(({ data }) => {
      const newComment: ICommentData = {
        id: data['id'],
        author: data['author'],
        avatar: userData['avatar'],
        authorLink: `https://www.reddit.com/user/${data.author}`,
        text: data['body'],
        createdAt: data['created'],
        createdAtAgo: 'только что',
        like: data['likes'],
        rating: data['ups'],
        replies: data['replies'],
      };
      const updatedComments = injectNewComment(comments, newComment);
      dispatch(updataPostDetailsDataSuccess(post, updatedComments));
    });
    onSubmit();
  };

  return <CommentForm value={value} onChange={handleChange} onSubmit={handleSubmit} isEditing={isEditing} onClickCancel={onClickCancel} />;
};
