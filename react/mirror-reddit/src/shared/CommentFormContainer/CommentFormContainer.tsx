import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApiServer } from '../../API/ApiServer';
import { ICommentData } from '../../hooks/usePostData';
import { IUserData } from '../../store/me/action';
import { updataPostDetailsDataError, updataPostDetailsDataSuccess } from '../../store/post/action';
import { TPostDetails } from '../../store/post/reducer';
import { TRootState } from '../../store/storeRedux';
import { CommentForm } from '../CommentForm/CommentForm';

export const CommentFormContainer = ({ postId }: { postId: string }) => {
  const token = useSelector<TRootState, string>((state) => state.token);
  const dispatch = useDispatch();
  const userData = useSelector<TRootState, IUserData>((state) => state.me.data);
  const { commentsData: comments, postData: post } = useSelector<TRootState, TPostDetails>((state) => state.postDetails);
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // dispatch(updateComment(e.target.value));
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // dispatch(updataPostDetailsData())
    ApiServer.sendComment(`t3_${postId}`, value, token).then(({ data }) => {
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
      dispatch(updataPostDetailsDataSuccess(post, [...comments, newComment]));
      dispatch(updataPostDetailsDataError(''));
    });
    // dispatch(updateComment(''))
    setValue('');
  };

  return <CommentForm value={value} onChange={handleChange} onSubmit={handleSubmit} placeholderValue={'Оставьте комментарий'} />;
};
