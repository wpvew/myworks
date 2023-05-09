import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import styles from './navbar.scss';
import classNames from 'classnames';

export function Navbar() {
  const permissions = useAppSelector((state) => state.emplyeeSliceReducer.employee.permissions);
  const local = useLocation().pathname.split('/')[1];
  const navigation = [
    { link: 'dashboard', name: 'Центр управления' },
    { link: 'employeers', name: 'Сотрудники' },
    { link: 'products', name: 'Товар' },
    { link: 'warehouse', name: 'Склад' },
  ];

  // console.log(local);

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navlist}>
        {navigation.map((item) => (
          <li
            className={classNames(styles.navitem, local === item.link ? styles.active : '')}
            key={item.link}
          >
            <NavLink className={styles.navlink} to={'/' + item.link}>
              {item.name}
            </NavLink>
          </li>
        ))}
        {/* <li className={styles.navitem}>
          <NavLink
            className={classNames(styles.navlink, local.pathname === '/dashboard')}
            to={'/dashboard'}
          >
            Центр управления
          </NavLink>
        </li>
        {permissions.hr && (
          <li className={styles.navitem}>
            <NavLink
              className={classNames(styles.navlink, local.pathname === '/employeers')}
              to={'/employeers'}
            >
              Сотрудники
            </NavLink>
          </li>
        )}
        {permissions.content && (
          <li className={styles.navitem}>
            <NavLink
              className={classNames(styles.navlink, local.pathname === '/products')}
              to={'/products'}
            >
              Товар
            </NavLink>
          </li>
        )}
        {permissions.warehouse && (
          <li className={styles.navitem}>
            <NavLink
              className={classNames(styles.navlink, local.pathname === '/warehouse')}
              to={'/warehouse'}
            >
              Склад
            </NavLink>
          </li>
        )} */}
      </ul>
    </nav>
  );
}
