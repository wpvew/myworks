import React from 'react';
import { useUserData } from '../../hooks/useUserData';
import { SearchBlock } from './SearchBlock';
import { UserBlock } from './UserBlock';
import { SortBlock } from './SortBlock';
import { ThreadTitle } from './ThreadTitle';
import styles from './header.css';
import { PostTabs } from './PostTabs';

function Header() {
  const { data, loading, error } = useUserData();
  return (
    <header className={styles.header}>
      <ThreadTitle />
      <SortBlock />
      <SearchBlock />
      <UserBlock loading={loading} avatarSrc={data.avatar} username={data.username} />
      <PostTabs />
    </header>
  );
}

export default Header;
