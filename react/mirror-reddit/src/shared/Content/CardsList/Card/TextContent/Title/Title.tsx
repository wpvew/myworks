import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { ICardProps } from '../..';
import styles from './title.css';

interface ITitleProps extends Pick<ICardProps, 'title' | 'postId'> {
  As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div' | 'a';
  clickableZone?: boolean;
}

export function Title({ title, postId, As = 'span', clickableZone }: ITitleProps) {
  const classesPostLink = classNames(styles.postLink, clickableZone ? styles.clickableZone : '');
  console.log(clickableZone);
  return (
    <h2 className={styles.title}>
      {As === 'a' ? (
        <Link to={`/posts/${postId}`} className={classesPostLink}>
          {title}
        </Link>
      ) : (
        <As className={classesPostLink}>{title}</As>
      )}
    </h2>
  );
}
