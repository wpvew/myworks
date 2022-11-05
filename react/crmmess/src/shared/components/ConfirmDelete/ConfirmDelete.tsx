import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { deleteClientItem } from '../../store/slices/clientListSlice';
import styles from '../../styles/confirmdelete.scss';

interface IConfirmDeleteProps {
  id: string;
  onClose: () => void;
}

export function ConfirmDelete({ id, onClose }: IConfirmDeleteProps) {
  const dispatch = useAppDispatch();

  const handleClickDelete = () => {
    dispatch(deleteClientItem(id));
    onClose();
  };

  return (
    <div className={styles.delete}>
      <h2 className={styles.title}>Удалить клиента</h2>
      <span className={styles.desc}>Вы действительно хотите удалить данного клиента?</span>
      <button onClick={handleClickDelete} className={styles.deleteBtn}>
        Удалить
      </button>
      <button onClick={onClose} className={styles.cancelBtn}>
        Отмена
      </button>
    </div>
  );
}
