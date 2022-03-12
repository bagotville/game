import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.scss';
import { Icons } from '../Svg/Svg.types';
import { HEADLINES } from './Header.constants';
import { Svg } from '../Svg';
import { authApi } from '../../api';

interface Props {
  refetch: () => void;
}

export function Header(props: Props) {
  const { refetch } = props;

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <Svg onClick={() => navigate('/')} className={styles.action} icon={Icons.LogoBug} height={24} />
      <span>{HEADLINES[location.pathname] || 'home'} — bugoville</span>
      <Svg
        onClick={() => {
          authApi.logout().then(() => {
            refetch();
          });
        }}
        className={styles.action}
        icon={Icons.Console}
        height={24}
      />
    </div>
  );
}
