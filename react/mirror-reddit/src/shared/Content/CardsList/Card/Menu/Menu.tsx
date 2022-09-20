import React, { useEffect, useState } from 'react';
import { Dropdown } from '../../../../Dropdown';
import { Icon, EIcons } from '../../../../Icon';
// import { MenuItemList } from './MenuItemList';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TRootState } from '../../../../../store/storeRedux';
import { TPostsList } from '../../../../../store/postsList/reducer';
import { ApiServer } from '../../../../../API/ApiServer';
import { updataPostsListDataSuccess } from '../../../../../store/postsList/action';
import { EDisplay, EScreens } from '../../../../Visible';
import { EColors, Text } from '../../../../Text';
import { generateId } from '../../../../../utils/react/generateRandomIndex';
import styles from './menu.css';
import stylesDropdownList from '../../../../../dropdownList.css';
import { GenericList } from '../../../../GenericList/GenericList';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

function setList(text: string, onClickAction: () => void, screenWindow: EScreens[], icon: EIcons, iconSize?: number, iconSizeW?: number, iconSizeH?: number) {
  return {
    As: 'li' as const,
    text: (
      <Text size={12} color={EColors.grey99}>
        {text}
      </Text>
    ),
    onClick: onClickAction,
    isDisabled: onClickAction == noop,
    icon: <Icon size={iconSize} sizeW={iconSizeW} sizeH={iconSizeH} name={icon} />,
    screens: screenWindow,
    typeDisplay: EDisplay.flex,
    className: [stylesDropdownList.menuItem],
  };
}

export function Menu({ postId }: { postId: string }) {
  const token = useSelector<TRootState, string>((state) => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useStore<TRootState>();
  const { data: posts } = useSelector<TRootState, TPostsList>((state) => state.postsListData);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsHidden(posts.find((post) => post.postId === postId)?.hidden || false);
    setIsSaved(posts.find((post) => post.postId === postId)?.saved || false);
  }, []);

  const handleClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickComment = () => {
    navigate(`/posts/${postId}`);
    handleClick();
  };

  const handleClickHide = () => {
    !isHidden ? ApiServer.hidding(`t3_${postId}`, token) : ApiServer.unHidding(`t3_${postId}`, token);
    setIsHidden(!isHidden);

    setTimeout(() => {
      const postsWithHidePost = posts.filter((post) => post.postId !== postId);
      store.getState().postsListData.data = [];
      dispatch(updataPostsListDataSuccess(postsWithHidePost));
    }, 0);
    handleClick();
  };

  const handleClickSave = () => {
    if (!isSaved) {
      ApiServer.saving(`t3_${postId}`, 'link', token).then(({ status }) => console.log(status));
    } else {
      ApiServer.unSaving(`t3_${postId}`, 'link', token).then(({ status }) => console.log(status));
      setTimeout(() => {
        const postsWithUnSavePost = posts.filter((post) => post.postId !== postId);
        store.getState().postsListData.data = [];
        dispatch(updataPostsListDataSuccess(postsWithUnSavePost));
      }, 0);
    }

    setIsSaved(!isSaved);
    handleClick();
  };

  const LIST = [
    setList('Комментарии', handleClickComment, [EScreens.desktop, EScreens.tablet], EIcons.message, 15),
    setList('Поделиться', noop, [EScreens.desktop, EScreens.tablet], EIcons.share, 0, 12, 14),
    setList(!isHidden ? 'Скрыть' : 'Отменить скрытие', handleClickHide, [], EIcons.block, 12),
    setList(!isSaved ? 'Сохранить' : 'Отменить сохранение', handleClickSave, [EScreens.desktop, EScreens.tablet], EIcons.plus, 14),
    setList('Пожаловаться', noop, [], EIcons.warning, 16),
  ].map(generateId);

  return (
    <div className={styles.menu}>
      <button className={styles.menuButton} onClick={handleClick}>
        <Icon name={EIcons.menu} sizeW={5} sizeH={20} />
      </button>
      {isDropdownOpen && (
        <Dropdown onClose={handleClick}>
          <div className={styles.dropdown}>
            {/* <MenuItemList LIST={LIST}/> */}
            <ul className={styles.menuItemsList}>
              {/* <MenuItemList postId={postId} onClose={handleClick} classes={stylesDropdownList.menuItem}/> */}
              <GenericList list={LIST} />
            </ul>
            <button className={styles.closeButton} onClick={handleClick}>
              Закрыть
            </button>
          </div>
        </Dropdown>
      )}
    </div>
  );
}
