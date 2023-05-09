import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { UTypegraphy } from '../../../../components/UTypegraphy';
import styles from './employeecreatedsuccess.scss';

interface IEmployeeCreatedSuccessProps {
  data: Record<'username' | 'password', string>;
  onClose: () => void;
}

export function EmployeeCreatedSuccess({ data, onClose }: IEmployeeCreatedSuccessProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handeClick(e: MouseEvent) {
      if (e.target instanceof Node && !ref.current?.contains(e.target)) {
        onClose();
      }
    }
    document.addEventListener('click', handeClick);

    // const rootHtmlElement = document.getElementById('react-root');
    // const modalPosition = window.scrollY;
    // if (rootHtmlElement) {
    //   rootHtmlElement.style.top = `-${modalPosition}px`;
    //   rootHtmlElement.classList.add('modal-active');
    // }
    return () => {
      document.removeEventListener('click', handeClick);
      // if (rootHtmlElement) {
      //   rootHtmlElement.removeAttribute('style');
      //   rootHtmlElement.classList.remove('modal-active');
      //   window.scrollTo(0, modalPosition);
      // }
    };
  }, []);

  const node = document.getElementById('modal-root');
  if (!node) return null;
  return ReactDOM.createPortal(
    <div className={styles.modal} ref={ref}>
      <UTypegraphy Tag='h3' size='l' sx={{ marginBottom: '5px' }}>
        Сотрудник добавлен
      </UTypegraphy>
      <UTypegraphy Tag='p' size='s' sx={{ marginBottom: '20px' }}>
        Поделитесь данными для входа с сотрудником. Больше их посмотреть нельзя.
      </UTypegraphy>
      <div className='' style={{}}>
        <div className={styles.group}>
          <UTypegraphy Tag='span'>username: </UTypegraphy>
          <UTypegraphy Tag='span'>{data.username}</UTypegraphy>
        </div>
        <div className={styles.group}>
          <UTypegraphy Tag='span'>password: </UTypegraphy>
          <UTypegraphy Tag='span'>{data.password}</UTypegraphy>
        </div>
      </div>
    </div>,
    node
  );
}
