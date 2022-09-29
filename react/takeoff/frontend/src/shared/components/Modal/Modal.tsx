import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import styles from './modal.scss';

interface IModalProps {
  children: React.ReactNode
}

export function Modal({ children }: IModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.target === ref.current) {
        navigate('/contacts')
      }
    }
    ref.current?.addEventListener('click', handleClick);
    document.body.style.overflow = 'hidden';
    return () => {
      window.scrollTo(0, window.scrollY);
      ref.current?.removeEventListener('click', handleClick);
      document.body.style.overflow = 'auto'
    };
  }, [])

  const node = document.getElementById('modal_root');
  if (!node) return null;
  return ReactDOM.createPortal(
    <div className={styles.overlay} ref={ref}>
      <div className={styles.modal} >
        {children}
      </div>
    </div>,
    node
  );
}
