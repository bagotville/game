import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { GAME_ROUTES } from '../../services';
import { GamePage } from './GamePage';
import styles from '../../App.scss';
import { LEVEL_01 } from '../../game/levels/levels';

export function GamePageRouter() {
  return (
    <Routes>
      <Route path={GAME_ROUTES.level1} element={<GamePage className={styles.page} level={LEVEL_01} />} />
    </Routes>
  );
}
