import React, { useEffect, useRef } from 'react';
import styles from './dropdown.css';

interface IDropdownProps {
  children: React.ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function Dropdown({ children, onClose = noop }: IDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.target instanceof Node && !ref.current?.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div ref={ref} className={styles.container}>
      <div className={styles.listContainer}>
        <div className={styles.list}>{children}</div>
      </div>
    </div>
  );
}
