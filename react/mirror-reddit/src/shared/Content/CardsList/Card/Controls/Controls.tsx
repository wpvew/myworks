import React from 'react';
import { Actions } from './Actions';
import { CommentsButton } from './CommentsButton';
import { KarmaCounterContainer } from './KarmaCounterContainer';
import styles from './controls.css';
import { EViewportVersion, useViewportVersion } from '../../../../../hooks/useViewportVersion';

interface IControlsProps {
  rating: number;
  postId: string;
  like: boolean | null;
}

export function Controls({ rating, postId, like }: IControlsProps) {
  const [viewportVersion] = useViewportVersion();

  return (
    <div className={styles.controls}>
      <KarmaCounterContainer like={like} id={postId} rating={rating} />
      {viewportVersion < EViewportVersion.desktop && <CommentsButton postId={postId} />}
      <Actions />
    </div>
  );
}
