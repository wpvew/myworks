import React from 'react';
import BlockIcon from '../icons/BlockIcon';
import MenuIcon from '../icons/MenuIcon';
import MessageIcon from '../icons/MessageIcon';
import PlusIcon from '../icons/PlusIcon';
import ShareIcon from '../icons/ShareIcon';
import WarningIcon from '../icons/WarningIcon';
import IconAnon from '../icons/IconAnon';
import SearchIcon from '../icons/SearchIcon';
import CircleIcon from '../icons/CircleIcon';
import FireIcon from '../icons/FireIcon';
import RocketIcon from '../icons/RocketIcon';
import StarIcon from '../icons/StarIcon';
import ArrowUpIcon from '../icons/ArrowUpIcon';
import styles from './icon.css';

export enum EIcons {
  block = 'BlockIcon',
  menu = 'MenuIcon',
  message = 'MessageIcon',
  plus = 'PlusIcon',
  share = 'ShareIcon',
  warning = 'WarningIcon',
  search = 'SearchIcon',
  circle = 'CircleIcon',
  star = 'StarIcon',
  rocket = 'RocketIcon',
  arrowUp = 'ArrowUpIcon',
  fire = 'FireIcon',
  anon = 'IconAnon',
}

interface IIconProps {
  name: EIcons;
  size?: number;
  sizeW?: number;
  sizeH?: number;
  classes?: string;
}

export function Icon({ name, size, sizeW, sizeH, classes }: IIconProps) {
  const iconComponents = {
    BlockIcon,
    MenuIcon,
    MessageIcon,
    PlusIcon,
    ShareIcon,
    WarningIcon,
    SearchIcon,
    CircleIcon,
    RocketIcon,
    FireIcon,
    StarIcon,
    ArrowUpIcon,
    IconAnon,
  };
  const IconComponent = iconComponents[name];
  const width = sizeW || size;
  const height = sizeH || size;

  return (
    <svg className={classes} width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill='none' xmlns='http://www.w3.org/2000/svg'>
      {<IconComponent />}
    </svg>
  );
}
