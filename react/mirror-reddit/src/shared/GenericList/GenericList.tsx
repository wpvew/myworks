import React from 'react';
import { EDisplay, EScreens } from '../Visible';
import stylesVisible from '../Visible/visible.css';
import classNames from 'classnames';
import styles from './genericlist.css';

export interface IItem {
  id: string;
  text: React.ReactNode;
  As: 'a' | 'li' | 'button' | 'div';
  onClick?: (e: MouseEvent) => void;
  isDisabled?: boolean;
  className: string[];
  screens?: EScreens[];
  typeDisplay?: EDisplay;
  href?: string;
  icon?: React.ReactNode;
}

interface IGenericListProps {
  list: IItem[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};
// GenericList - функция, которые может рендерить вообще любые списки
export function GenericList({ list }: IGenericListProps) {
  const classes = classNames();
  return (
    <>
      {list.map(({ As = 'div', text, onClick = noop, isDisabled, className, id, href, icon, screens, typeDisplay }) => {
        const classes = classNames(
          ...className,
          screens?.map((screen) => stylesVisible[`${screen}`]),
          { [stylesVisible[`${typeDisplay}`]]: typeDisplay }
        );
        return (
          <As className={classes} onClick={(e: any) => onClick(e)} key={id} href={href} disabled={isDisabled}>
            {icon}
            {text}
          </As>
        );
      })}
    </>
  );
}
