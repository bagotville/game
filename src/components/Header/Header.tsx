import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from './Header.scss';
import { Icons } from '../Svg/Svg.types';
import { HEADLINES } from './Header.constants';
import { Svg } from '../Svg';
import { useLogout } from '../../api';
import { changeSchemeToDark, changeSchemeToLight, isDarkScheme } from '../../store/reducers/scheme';
import { useAppDispatch } from '../../store/store.hooks';

export function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();
  const isDark = useSelector(isDarkScheme);
  const dispatch = useAppDispatch();

  const headerClasses = classNames(styles.header, {
    [styles.header_dark]: isDark,
  });

  const schemeClasses = classNames(styles.scheme, {
    [styles.scheme_dark]: isDark,
  });

  // todo: add modal for confirm
  const logoutHandler = () => {
    logout.mutateAsync({});
  };

  return (
    <div className={headerClasses}>
      <Svg onClick={() => navigate('/')} className={styles.action} icon={Icons.LogoBug} height={24} />
      <span>{HEADLINES[location.pathname] || 'home'} — bugoville</span>
      <div className={styles['wrapper-logout']}>
        <div
          className={schemeClasses}
          onClick={() => {
            if (isDark) dispatch(changeSchemeToLight());
            if (!isDark) dispatch(changeSchemeToDark());
          }}
        />
        <Svg onClick={logoutHandler} className={styles.action} icon={Icons.Console} height={24} />
      </div>
    </div>
  );
}
