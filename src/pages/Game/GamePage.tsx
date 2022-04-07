import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { IGameProps } from './GamePage.types';
import { Game } from '../../game/Game';
import { CANVAS_ROOT_ID, FULL_SCREEN_BTN_ID } from './GameConstants';
import { LEVEL_01, LEVEL_02 } from '../../game/levels/levels';
import styles from './GamePage.scss';

let currentLevel: string;
// -Djava.library.path=/Users/iliya132/arcadia/idea-projects/market/mbo/alias-maker/contrib
let game: Game;

export function GamePage(props: IGameProps) {
  const { levelId } = useParams();
  const [isGameEnded, setIsGameEnded] = useState(false);
  if (levelId === undefined) {
    throw new Error('invalid level passed');
  }
  const { className } = props;
  currentLevel = getCurrentLevel(levelId);
  game = new Game(currentLevel);
  game.subscribeForGameEndEvent(() => {
    setIsGameEnded(true);
  });
  return isGameEnded ? (
    <div className={classNames(className, styles['game-page'])}>
      <h1 className={styles['game-end-message']}>Game end. You died.</h1>
    </div>
  ) : (
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
  const fullScreenBtn = document.createElement('button');
  fullScreenBtn.id = FULL_SCREEN_BTN_ID;
  fullScreenBtn.className = styles['full-screen-btn'];
  fullScreenBtn.innerText = 'Expand to full screen';

  root.appendChild(fullScreenBtn);
  const canvas = document.createElement('canvas');
  canvas.id = CANVAS_ROOT_ID;
  canvas.className = styles['canvas-style'];
  fullScreenBtn.addEventListener('click', () => {
    canvas.requestFullscreen();
  });
  root.appendChild(fullScreenBtn);
  root.appendChild(canvas);

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
