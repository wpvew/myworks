import React from 'react';
import { Controls } from './Controls';
import { Menu } from './Menu';
import { Preview } from './Preview';
import { TextContent } from './TextContent';
import styles from './card.css';

export interface ICardProps {
  postId: string;
  title: string;
  author: string;
  userAvatar?: string;
  rating: number;
  image: string;
  like: boolean | null;
  text?: string;
  createdAt: string;
  createdAtAgo: string;
}

export function Card(props: ICardProps) {
  return (
    <li className={styles.card}>
      <TextContent titleAs={'a'} postId={props.postId} noModal={true} />
      <Preview postId={props.postId} />
      <Menu postId={props.postId} />
      <Controls like={props.like} postId={props.postId} rating={props.rating} />
    </li>
  );
}
