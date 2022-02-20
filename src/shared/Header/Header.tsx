import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Header.scss';
import Svg from '../../components/Svg';
import { Icons } from '../../components/Svg/Svg.types';
import { HEADLINES } from './Header.constants';

export function Header() {
  const location = useLocation();

  return (
    <div className={styles.header}>
      <Svg icon={Icons.LogoBug} height={24} />
      <span>{HEADLINES[location.pathname]} — bugoville</span>
      <Svg icon={Icons.Console} height={24} />
    </div>
  );
}