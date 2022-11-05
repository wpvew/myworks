import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeToken } from '../../store/slices/userSlice';
import styles from '../../styles/userprofile.scss';

interface IUserProfile {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfile = ({ isOpen, onClose }: IUserProfile) => {
  const { username, isAdmin } = useAppSelector((state) => state.userReducer.user);
  const nodeRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target instanceof Node && !nodeRef.current?.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const handleClickLogout = () => {
    onClose();
    dispatch(removeToken());
    localStorage.removeItem('token');
  };

  const node = document.getElementById('modal_root');
  if (!node) return null;
  return ReactDOM.createPortal(
    <CSSTransition
      in={isOpen}
      nodeRef={nodeRef}
      timeout={300}
      unmountOnExit
      classNames={{
        enter: 'profileEnter',
        enterActive: `profileEnterActive`,
        exit: 'profileExit',
        exitActive: 'profileExitActive',
      }}
    >
      <div ref={nodeRef} className={styles.container}>
        <div className={styles.profile}>
          <div className={styles.header}>Hi, {username}</div>
          <div className={styles.serviceMsg}>Profile control panel is not yet available</div>
          <button onClick={handleClickLogout} className={styles.logoutBtn}>
            {/* <Icon name={EIcons.logout} /> */}
            <span>Logout</span>
          </button>
        </div>
      </div>
    </CSSTransition>,
    node
  );
};
