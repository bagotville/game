import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './Header.scss';
import { Icons } from '../Svg/Svg.types';
import { HEADLINES } from './Header.constants';
import { Svg } from '../Svg';

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
