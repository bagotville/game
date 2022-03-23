import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.scss';
import { Icons } from '../Svg/Svg.types';
import { HEADLINES } from './Header.constants';
import { Svg } from '../Svg';
import { IHeaderProps } from './Header.types';
import { useLogout } from '../../api';

export function Header(props: IHeaderProps) {
  const { isAuthRefetch } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const logout = useLogout();

  // todo: add modal for confirm
  const logoutHandler = () => {
    logout.mutateAsync({}).then(() => {
      isAuthRefetch();
    });
  };

  return (
    <div className={styles.header}>
      <Svg onClick={() => navigate('/')} className={styles.action} icon={Icons.LogoBug} height={24} />
      <span>{HEADLINES[location.pathname] || 'home'} — bugoville</span>
      <Svg onClick={logoutHandler} className={styles.action} icon={Icons.Console} height={24} />
    </div>
  );
}
