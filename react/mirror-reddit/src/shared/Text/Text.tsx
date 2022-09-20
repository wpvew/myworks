import React from 'react';
import styles from './text.css';
import classNames from 'classnames';
import ReactHtmlParser from 'react-html-parser';

type TSizes = 28 | 20 | 16 | 14 | 12 | 10 | 0;

export enum EColors {
  black = 'black',
  orange = 'orange',
  green = 'green',
  white = 'white',
  greyF4 = 'greyF4',
  greyF3 = 'greyF3',
  greyD9 = 'greyD9',
  greyC4 = 'greyC4',
  grey99 = 'grey99',
  grey66 = 'grey66',
}

interface ITextProp {
  As?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  size: TSizes;
  mobileSize?: TSizes;
  tabletSize?: TSizes;
  desktopSize?: TSizes;
  color?: EColors;
  children?: React.ReactNode;
  // children: string
  stylesProp?: string;
}

export const Text = ({ As = 'span', size, color = EColors.black, stylesProp, children, mobileSize, desktopSize, tabletSize }: ITextProp) => {
  const classes = classNames(
    styles[`s${size}`],
    styles[color],
    stylesProp,
    { [styles[`m${mobileSize}`]]: mobileSize },
    { [styles[`t${tabletSize}`]]: tabletSize },
    { [styles[`d${desktopSize}`]]: desktopSize }
  );

  return <As className={classes}>{children}</As>;
};
