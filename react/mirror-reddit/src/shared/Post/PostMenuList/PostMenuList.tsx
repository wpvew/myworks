import React, { useEffect, useState } from 'react';
import { GenericList } from '../../GenericList/GenericList';
import { useSelector } from 'react-redux';
import { Icon, EIcons } from '../../Icon';
import { TRootState } from '../../../store/storeRedux';
import { ApiServer } from '../../../API/ApiServer';
import { EDisplay, EScreens } from '../../Visible';
import { EColors, Text } from '../../Text';
import { generateId } from '../../../utils/react/generateRandomIndex';
import { IPostData } from '../../../hooks/usePostData';
import styles from './postmenulist.css';

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function PostMenuList({ post }: { post: IPostData }) {
  const token = useSelector<TRootState, string>((state) => state.token);
  const [isHidden, setIsHidden] = useState(false);
  const [isSaved, setIsSaved] = useState(post.saved);

  function setList(text: string, onClickAction: (e: MouseEvent) => void, screenWindow: EScreens[], icon: EIcons, iconSize?: number, iconSizeW?: number, iconSizeH?: number) {
    return {
      As: 'li' as const,
      text: (
        <Text size={14} mobileSize={12} color={EColors.grey99}>
          {text}
        </Text>
      ),
      onClick: onClickAction,
      isDisabled: onClickAction == noop,
      icon: <Icon size={iconSize} sizeW={iconSizeW} sizeH={iconSizeH} name={icon} />,
      screens: screenWindow,
      typeDisplay: EDisplay.flex,
      className: [styles.menuItem],
    };
  }

  useEffect(() => {
    setIsSaved(post.saved);
  }, [post.saved]);

  const handleClickHide = (e: MouseEvent) => {
    !isHidden ? ApiServer.hidding(`t3_${post.postId}`, token) : ApiServer.unHidding(`t3_${post.postId}`, token);
    e.stopPropagation();
    setIsHidden(!isHidden);
  };

  const handleClickSave = (e: MouseEvent) => {
    !isSaved
      ? ApiServer.saving(`t3_${post.postId}`, 'link', token).then(({ status }) => console.log(status))
      : ApiServer.unSaving(`t3_${post.postId}`, 'link', token).then(({ status }) => console.log(status));
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const LIST = [
    setList(`${post.qtyComments} Комментарий`, noop, [], EIcons.message, 15),
    setList('Поделиться', noop, [], EIcons.share, 0, 12, 14),
    setList(!isHidden ? 'Скрыть' : 'Отменить скрытие', handleClickHide, [], EIcons.block, 12),
    setList(!isSaved ? 'Сохранить' : 'Отменить сохранение', handleClickSave, [], EIcons.plus, 14),
    setList('Пожаловаться', noop, [], EIcons.warning, 16),
  ].map(generateId);

  return (
    <ul className={styles.menuItemsList}>
      <GenericList list={LIST} />
    </ul>
  );
}
