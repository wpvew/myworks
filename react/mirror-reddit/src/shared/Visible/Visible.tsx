import React from 'react';
import styles from './visible.css'
import classNames from 'classnames';

export enum EScreens {
  desktop = 'desktop',
  tablet = 'tablet',
  mobile = 'mobile',
}

export enum EDisplay {
  block = 'block',
  inline = 'inline',
  flex = 'flex',
  grid = 'grid',
}

interface IVisibleProps {
  children: React.ReactNode,
  screens: EScreens[],
  typeDisplay: EDisplay
}

const Visible = ({ children, screens, typeDisplay }: IVisibleProps) => {

  return (
    <div className={classNames(
      screens.map(screen => styles[screen]),
      styles[typeDisplay]
    )}>
      {children}
    </div>
  );
};

export default Visible;
