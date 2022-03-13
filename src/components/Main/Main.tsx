import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './Main.scss';
import { ROUTES } from '../../services';
import { Profile } from '../../pages/Profile';
import { Leaderboard } from '../../pages/Leaderboard';

export function Main() {
  return (
    <div className={styles.main}>
      <Routes>
        <Route
          path={ROUTES.profile}
          element={<Profile className={styles.page} />}
        />
        <Route
          path={ROUTES.leaderboard}
          element={<Leaderboard className={styles.page} />}
        />
      </Routes>
    </div>
  );
}
