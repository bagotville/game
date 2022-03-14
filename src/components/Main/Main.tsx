import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Main.scss';

export function Main() {
  return (
    <div className={styles.main}>
      <Outlet />
    </div>
  );
}
