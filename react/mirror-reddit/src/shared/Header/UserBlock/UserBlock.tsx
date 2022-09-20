import React from 'react';
import { Break } from '../../Break';
import { EIcons, Icon } from '../../Icon';
import { EColors, Text } from '../../Text';
import styles from './userblock.css';

interface IUserBlockProps {
  avatarSrc?: string;
  username?: string;
  loading?: boolean;
}

export function UserBlock({ avatarSrc, username, loading }: IUserBlockProps) {
  const handleClickExit = () => {
    localStorage.removeItem('token');
    location.reload();
  };
  return (
    <div className={styles.accountManagment}>
      <a
        href={`https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=random_str&redirect_uri=${process.env.REDIR_URL}&duration=permanent&scope=identity read submit save vote history report`}
        className={styles.userBox}
      >
        <div className={styles.avatarBox}>
          {avatarSrc ? <img src={avatarSrc} alt='user avatar' className={styles.avatarImage} /> : <Icon name={EIcons.anon} size={50} classes={styles.avatarImage} />}
        </div>

        <div className={styles.username}>
          <Break size={12} />
          {loading ? (
            <Text size={20} color={EColors.black}>
              Loading...
            </Text>
          ) : (
            <Text size={20} color={EColors.black}>
              {username || 'Anonim'}
            </Text>
          )}
        </div>
      </a>

      {username && (
        <button className={styles.btnLogout} type='button' onClick={handleClickExit}>
          <Text mobileSize={14} size={20} color={EColors.black}>
            Выйти
          </Text>
        </button>
      )}
    </div>
  );
}
