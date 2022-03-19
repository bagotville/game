import React from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { IGameProps } from './GamePage.types';
import { Game } from '../../game/Game';
import { CANVAS_ROOT_ID } from './GameConstants';
import { LEVEL_01, LEVEL_02 } from '../../game/levels/levels';
import styles from './GamePage.scss';

let currentLevel: string;

export function GamePage(props: IGameProps) {
  const { levelId } = useParams();
  if (levelId === undefined) {
    throw new Error('invalid level passed');
  }
  const { className } = props;
  currentLevel = getCurrentLevel(levelId);
  return (
    <div className={classNames(className, styles['game-page'])}>
      <div id="game-root">
        <button className={styles['game-start-btn']} type="button" onClick={() => startGame()}>
          start game
        </button>
      </div>
    </div>
  );
}

function startGame() {
  const root = document.getElementById('game-root');
  if (root === null) {
    throw new Error('cant ascquire root for starting the game');
  }
  root.innerHTML = '';
  const canvas = document.createElement('canvas');
  canvas.id = CANVAS_ROOT_ID;
  canvas.className = styles['canvas-style'];
  root.appendChild(canvas);

  const game = new Game(currentLevel);
  game.start();
}

function getCurrentLevel(levelId: string) {
  switch (levelId) {
    case 'level1':
      return LEVEL_01;
    case 'level2':
      return LEVEL_02;
    default:
      return LEVEL_02;
  }
}
