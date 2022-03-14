import React from 'react';
import classNames from 'classnames';
import styles from './Leaderboard.scss';
import { Svg } from '../../components/Svg';
import { Icons } from '../../components/Svg/Svg.types';

interface Props {
  className: string;
}

export function Leaderboard(props: Props) {
  const { className: externalClassName } = props;
  const leaderboardClasses = classNames(styles.leaderboard, externalClassName);

  const numbers: number[] = [];

  for (let i = 1; i <= 23; i += 1) {
    numbers.push(i);
  }

  function getUserIcon(place: number) {
    if (place === 1) return <Svg icon={Icons.Crown} />;
    if (place === 2) return <Svg icon={Icons.Pacman} />;
    if (place === 3) return <Svg icon={Icons.Ghost} />;
    return <Svg icon={Icons.Star} />;
  }

  function getUserPlace(place: number) {
    if (place === 1) return `${place}st place`;
    if (place === 2) return `${place}nd place`;
    if (place === 3) return `${place}rd place`;
    return `${place}th place`;
  }

  return (
    <div className={leaderboardClasses}>
      <div>
        {numbers.map((number) => (
          <div className={styles.number} key={number}>
            {number}
          </div>
        ))}
      </div>

      <div>
        <div className={styles.header}>
          Top - 10 players&ensp;
          <Svg icon={Icons.Leaders} height={20} width={20} />
        </div>

        <div className={styles.divider}>----------------------</div>

        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((place) => {
          const avatarClasses = classNames(styles.avatar, {
            [styles.avatar_first]: place === 1,
            [styles.avatar_second]: place === 2,
            [styles.avatar_third]: place === 3,
          });

          const userInfoClasses = classNames(styles['user-info'], {
            [styles['user-info_first']]: place === 1,
            [styles['user-info_second']]: place === 2,
            [styles['user-info_third']]: place === 3,
          });

          return (
            <div className={styles['user-card']} key={place}>
              <div className={avatarClasses}>
                <Svg icon={Icons.LogoBug} />
              </div>

              <div className={styles['user-info-wrapper']}>
                <div className={userInfoClasses}>
                  <span className={styles['user-icon']}>{getUserIcon(place)}&ensp;</span>
                  <span className={styles['user-name']}>Username</span>
                  <span>| {getUserPlace(place)}&ensp;</span>
                  <span>| 100500 points </span>
                </div>
                <div>==================================================</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
