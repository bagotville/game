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
          <button className={styles['game-message']} type="button" onClick={() => restartLevel()}>
            <p className={classNames(styles['message-title'], styles['red-color'])}>you are bugged</p>
            <p className={styles['message-subtitle']}>
              score:
              <span className={styles['red-color']}> {score} </span>
            </p>
            <p className={classNames(styles['message-action'], styles.red)}>click here to restart</p>
          </button>
        </div>
      );
    case EndReason.ESCAPED:
      return (
        <div className={classNames(className, styles['game-page'])}>
          <NavLink
            className={styles['game-message']}
            type="button"
            to={`/game/level${currentLevelId + 1}`}
            reloadDocument>
            <p className={styles['message-title']}>congrats, tough nut</p>
            <p className={styles['message-subtitle']}>
              score:
              <span className={styles['yellow-color']}> {score} </span>
            </p>
            <p className={styles['message-action']}>click here to next level</p>
          </NavLink>
        </div>
      );
    default:
      throw new Error('Unkown game end event');
  }
}

function restartLevel() {
  window.location.reload();
}
