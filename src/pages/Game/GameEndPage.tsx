import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { EndReason, IGameEndProps } from './GamePage.types';
import styles from './GamePage.scss';

export function GameEndPage(props: IGameEndProps) {
  const { endReason, className, currentLevelId, score } = props;
  switch (endReason) {
    case EndReason.DIED:
      return (
        <div className={classNames(className, styles['game-page'])}>
          <h1 className={styles['game-end-message']}>Game end. You died. Your final score is {score}</h1>
        </div>
      );
    case EndReason.ESCAPED:
      return (
        <div className={classNames(className, styles['game-page'])}>
          <h1 className={styles['game-end-message']}>
            Congratulations! You made it! Your final score is {score}. Try out next level:&nbsp;
            <NavLink className={styles['game-end-link']} to={`/game/level${currentLevelId + 1}`} reloadDocument>
              <div className={styles.tree}>{` Level ${currentLevelId + 1}`} </div>
            </NavLink>
          </h1>
        </div>
      );
    default:
      throw new Error('Unkown game end event');
  }
}
