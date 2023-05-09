import React, { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './ubutton.scss';

interface IUButtonProps {
  Tag: typeof Link | 'button' | 'a';
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'text' | 'contained' | 'outlined';
  href?: string;
  type?: 'button' | 'submit';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  style?: 'primary' | 'secondary';
  sx?: CSSProperties;
}

export function UButton(props: IUButtonProps) {
  const {
    Tag,
    children,
    onClick,
    variant = 'contained',
    type,
    href = '',
    style = 'primary',
    size = 'm',
    sx,
  } = props;

  const classname = classNames(styles.button, styles[style], styles[size], styles[variant]);

  return Tag === 'a' ? (
    <a href={href} className={classname} type={type} style={sx}>
      {children}
    </a>
  ) : (
    <Tag className={classname} type={type} to={href} style={sx} onClick={onClick}>
      {children}
    </Tag>
  );
}
