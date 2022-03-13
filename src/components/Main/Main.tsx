import React from 'react';
import { Route, Routes } from 'react-router-dom';
import styles from './Main.scss';
import { ROUTES } from '../../services';
import { Profile } from '../../pages/Profile';
import { Forum } from '../../pages/Forum';

export function Main() {
  return (
    <div className={styles.main}>
      <Routes>
        <Route
          path={ROUTES.profile}
          element={<Profile className={styles.page} />}
        />
        <Route
          path={ROUTES.forum}
          element={<Forum className={styles.page} />}
        />
      </Routes>
    </div>
  );
}
