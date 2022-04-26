import React from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './Main.scss';
import { isDarkScheme } from '../../store/reducers/scheme';

export function Main() {
  const isDark = useSelector(isDarkScheme);

  const mainClasses = classNames(styles.main, {
    [styles.main_dark]: isDark,
  });

  return (
    <div className={mainClasses}>
      <Outlet />
    </div>
  );
}
