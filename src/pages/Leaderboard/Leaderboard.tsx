import React, { useEffect } from 'react';
import classNames from 'classnames';
import { range } from 'lodash';
import styles from './Leaderboard.scss';
import { Svg } from '../../components/Svg';
import { Icons } from '../../components/Svg/Svg.types';
import { useGetLeaderboard } from '../../api/hooks/useGetLeaderboard';
import { ILeaderboardProps } from './Leaderboard.types';
import { BASE_URL } from '../../services';

export function Leaderboard(props: ILeaderboardProps) {
  const { className: externalClassName } = props;

  const leaderboardClasses = classNames(styles.leaderboard, externalClassName);

  const getLeaderboard = useGetLeaderboard();

  useEffect(() => {
    getLeaderboard.mutateAsync({ cursor: 0, limit: 10, ratingFieldName: 'rating' });
  }, []);

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
        {range(1, 24).map((number) => (
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

        {getLeaderboard.data?.map((user, index) => {
          const { avatar, first_name: firstName, second_name: secondName, rating } = user?.data ?? {};
          const place = index + 1;

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
                {avatar ? <img src={`${BASE_URL}/resources/${avatar}`} alt="" /> : <Svg icon={Icons.LogoBug} />}
              </div>

              <div className={styles['user-info-wrapper']}>
                <div className={userInfoClasses}>
                  <span className={styles['user-icon']}>{getUserIcon(place)}&ensp;</span>
                  <span className={styles['user-name']}>{`${firstName || 'Anonymous'} ${secondName || ''}`}</span>
                  <span>| {getUserPlace(place)}&ensp;</span>
                  <span>| {rating} </span>
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
