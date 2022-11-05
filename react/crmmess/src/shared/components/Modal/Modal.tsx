import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { emptyClientData, updateClientData } from '../../store/slices/clientDataSlice';
import styles from '../../styles/modal.scss';

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ children, onClose }: IModalProps) {
  const refOverlay = useRef<HTMLDivElement>(null);
  const refModal = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const clientData = useAppSelector((state) => state.clientDataReducer.clientData);
  const [isScroll, setIsScroll] = useState(false);

  useEffect(() => {
    if (refModal.current instanceof HTMLDivElement) {
      setIsScroll(refModal.current?.offsetHeight > window.innerHeight);
    }
  }, [clientData.contacts.length]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.target === refOverlay.current) {
        handleCloseModal();
      }
    }
    refOverlay.current?.addEventListener('click', handleClick);
    document.body.style.overflow = 'hidden';
    return () => {
      window.scrollTo(0, window.scrollY);
      refOverlay.current?.removeEventListener('click', handleClick);
      document.body.style.overflow = 'auto';
      dispatch(updateClientData(emptyClientData));
    };
  }, []);

  const handleCloseModal = () => {
    navigate('/contacts');
    onClose();
  };

  const node = document.getElementById('modal_root');
  if (!node) return null;
  return ReactDOM.createPortal(
    <div className={styles.overlay} ref={refOverlay} style={isScroll ? { alignItems: 'flex-start' } : {}}>
      <div className={styles.modal} ref={refModal}>
        <button onClick={handleCloseModal} className={styles.btnClose}></button>
        {children}
      </div>
    </div>,
    node
  );
}
