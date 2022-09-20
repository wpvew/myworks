import React from 'react';
import styles from './userlink.css';

interface IUserLinkProps {
  userName: string;
  userAvatar?: string;
}

export function UserLink({ userName, userAvatar }: IUserLinkProps) {
  return (
    <div className={styles.userLink}>
      <img className={styles.avatar} src={userAvatar} alt='avatar' />
      <a href='#user-url' className={styles.username}>
        {userName}
      </a>
    </div>
  );
}
