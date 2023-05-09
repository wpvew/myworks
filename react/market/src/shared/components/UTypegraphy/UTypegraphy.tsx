import React, { CSSProperties } from 'react';
import styles from './utypegraphy.scss';
import classNames from 'classnames';

interface IUTypegraphyProps {
  children: React.ReactNode;
  Tag: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'titleS' | 'titleM' | 'titleL';
  sx?: CSSProperties;
}

export function UTypegraphy(props: IUTypegraphyProps) {
  const { children, Tag, size = 'm', sx } = props;

  const classname = classNames(styles.typography, styles[size]);

  return (
    <Tag className={classname} style={sx}>
      {children}
    </Tag>
  );
}
