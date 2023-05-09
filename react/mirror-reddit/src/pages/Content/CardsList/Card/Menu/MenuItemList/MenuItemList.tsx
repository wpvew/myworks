// import React, { useEffect, useState } from 'react';
// import { GenericList } from '../../../../../GenericList/GenericList';
// import { useDispatch, useSelector, useStore } from 'react-redux';
// import { Icon, EIcons } from '../../../../../Icon';
// import { useNavigate } from 'react-router-dom';
// import { TRootState } from '../../../../../../store/storeRedux';
// import { TPostsList } from '../../../../../../store/postsList/reducer';
// import { ApiServer } from '../../../../../../API/ApiServer';
// import { updataPostsListDataSuccess } from '../../../../../../store/postsList/action';
// import { EDisplay, EScreens } from '../../../../../Visible';
// import { EColors, Text } from '../../../../../Text';
// import { generateId } from '../../../../../../utils/react/generateRandomIndex';
// import stylesDropdownList from '../../../../../../dropdownList.css'
// import styles from './menuitemlist.css';

// interface IMenuItemListProps {
//   postId?: string,
//   onClose?: () => void,
//   classes: string,
// }

// const noop = () => {}

// export function MenuItemList({ postId, onClose = noop, classes }: IMenuItemListProps) {
// // export function MenuItemList({ LIST }: { LIST: IItem[] }) {
//   // LIST = LIST.map((item: IItem) => ({...item, className: styles.menuItem}))


//   const token = useSelector<TRootState, string>(state => state.token);
//   const dispatch = useDispatch()
//   const navigate = useNavigate();
//   const store = useStore<TRootState>();
//   const { data: posts } = useSelector<TRootState, TPostsList>(state => state.postsListData);
//   const [isHidden, setIsHidden] = useState(false);
//   const [isSaved, setIsSaved] = useState(false)

//   function setList(
//     text: string,
//     onClickAction: () => void,
//     screenWindow: EScreens[],
//     icon: EIcons,
//     iconSize?: number,
//     iconSizeW?: number,
//     iconSizeH?: number,
//   ) {
//     return {
//       As: 'li' as const,
//       text: <Text size={12} color={EColors.grey99}>{text}</Text>,
//       onClick: onClickAction,
//       isDisabled: onClickAction == noop,
//       icon: <Icon size={iconSize} sizeW={iconSizeW} sizeH={iconSizeH} name={icon}/>,
//       screens: screenWindow,
//       typeDisplay: EDisplay.flex,
//       // className: stylesDropdownList.menuItem
//       className: [classes]
//     }
//   }

//   useEffect(() => {
//     setIsHidden(posts.find(post => post.postId === postId)?.hidden || false);
//     setIsHidden(posts.find(post => post.postId === postId)?.saved || false);
//   }, [])

//   const handleClickComment = () => {
//     navigate(`/posts/${postId}`);
//     onClose()
//   }

//   const handleClickHide = () => {
//     !isHidden
//       ? ApiServer.hidding(`t3_${postId}`, token)
//       : ApiServer.unHidding(`t3_${postId}`, token)
//     setIsHidden(!isHidden);

//     setTimeout(() => {
//       const postsWithHidePost = posts.filter(post => post.postId !== postId)
//       store.getState().postsListData.data = [];
//       dispatch(updataPostsListDataSuccess(postsWithHidePost));
//     }, 0)
//     onClose();
//   }

//   const handleClickSave = () => {
//     console.log(isSaved)
//     !isSaved
//       ? ApiServer.saving(`t3_${postId}`, 'link', token).then(({ status }) => console.log(status))
//       : ApiServer.unSaving(`t3_${postId}`, 'link', token).then(({ status }) => console.log(status));
//     setIsSaved(!isSaved)
//   }



//   const LIST = [
//     setList('Комментарии', handleClickComment, [EScreens.desktop, EScreens.tablet], EIcons.message, 15),
//     setList('Поделиться', noop, [EScreens.desktop, EScreens.tablet], EIcons.share, 0, 12, 14),
//     setList(!isHidden ? 'Скрыть' : 'Отменить скрытие', handleClickHide, [], EIcons.block, 12),
//     setList(!isSaved ? 'Сохранить' : 'Отменить сохранение', handleClickSave, [EScreens.desktop, EScreens.tablet], EIcons.plus, 14),
//     setList('Пожаловаться', noop, [], EIcons.warning, 16),
//    ].map(generateId);

//   return (
//     <GenericList list={LIST} />
//   );
// }
