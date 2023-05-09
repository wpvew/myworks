import React, { useEffect } from 'react';
import ApiServer from '../../API/ApiServer';
import { UButton } from '../../components/UButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UContainer } from '../../components/UContainer';
import { UBox } from '../../components/UBox';
import { UTypegraphy } from '../../components/UTypegraphy';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updatePage } from '../../store/slice/pageSlice';
import { removeEmployeeData } from '../../store/slice/emplyeeSlice';
import { pageName } from './pageName';
import styles from './header.scss';

export const Header = () => {
  const page = useAppSelector((state) => state.pageSliceReducer.name);
  const employee = useAppSelector((state) => state.emplyeeSliceReducer.employee);
  const dispatch = useAppDispatch();
  const local = useLocation().pathname.split('/')[1];
  const navigate = useNavigate();
  const headerMenu = {
    about: 'О компании',
    service: 'Сервис',
    cooperation: 'Сотрудничество',
  };

  useEffect(() => {
    dispatch(updatePage(pageName(local)));
  }, [local]);

  const handleLogout = () => {
    ApiServer.logout(employee.token).then(({ data }) => {
      if (data.payload) {
        dispatch(removeEmployeeData());
        localStorage.removeItem('token');
        navigate('/');
      }
    });
  };

  return (
    <header className={styles.header}>
      <UContainer display='flex'>
        <UBox
          display='grid'
          sx={{
            gridTemplateColumns: page ? '200px 1fr 1fr 1fr' : '200px 1fr',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <UButton Tag={Link} href='/' variant='text'>
            <UTypegraphy Tag='span' size='titleS'>
              SellerBoard
            </UTypegraphy>
          </UButton>

          {page && (
            <UTypegraphy Tag='h1' size='l'>
              {page}
            </UTypegraphy>
          )}
          <nav style={{ justifySelf: 'flex-end' }}>
            <ul style={{ display: 'flex' }}>
              {(Object.keys(headerMenu) as Array<keyof typeof headerMenu>).map((key) => (
                <li className={styles.menuItem} key={key}>
                  <UButton Tag={Link} href={`/${key}`} variant='text' size='s'>
                    {headerMenu[key]}
                  </UButton>
                </li>
              ))}
            </ul>
          </nav>
          {page && (
            <UButton
              Tag='button'
              variant='text'
              size='m'
              onClick={handleLogout}
              sx={{ justifySelf: 'flex-end' }}
            >
              Выйти
            </UButton>
          )}
        </UBox>
      </UContainer>
    </header>
  );
};
