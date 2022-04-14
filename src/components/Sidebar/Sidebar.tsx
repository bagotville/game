import React, { useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.scss';
import { Icons } from '../Svg/Svg.types';
import { Svg } from '../Svg';

export function Sidebar() {
  const [isOpenTree, setIsOpenTree] = useState(false);

  const treeClasses = classNames(styles['icon-tree'], {
    [styles['icon-tree_open']]: isOpenTree,
  });

  const navLinkActiveClasses = ({ isActive }: { isActive: boolean }) =>
    classNames(styles['nav-button'], {
      [styles['link-active']]: isActive,
    });

  return (
    <div className={styles.sidebar}>
      <div className={styles.explorer}>
        <span className={styles.title}>Explorer</span>
        <div className={styles.divider} />

        <div className={styles['level-tree']}>
          <div className={styles['tree-header']} onClick={() => setIsOpenTree(!isOpenTree)}>
            <Svg className={treeClasses} icon={Icons.OpenTree} height={10} />
            Bugoville
          </div>

          {isOpenTree ? (
            <>
              <NavLink className={navLinkActiveClasses} to="/game/level1" reloadDocument>
                <div className={styles.tree}>{'</>'} Level 01 </div>
              </NavLink>
              <NavLink className={navLinkActiveClasses} to="/game/level2" reloadDocument>
                <div className={styles.tree}>{'</>'} Level 02 </div>
              </NavLink>
              <NavLink className={navLinkActiveClasses} to="/game/level3" reloadDocument>
                <div className={styles.tree}>{'</>'} Level 03 </div>
              </NavLink>
            </>
          ) : null}
        </div>
      </div>

      <nav className={styles.navigation}>
        <NavLink className={navLinkActiveClasses} to="/forum">
          <Svg icon={Icons.Forum} className={styles['icon-active']} />
          forum
        </NavLink>

        <NavLink className={navLinkActiveClasses} to="/profile">
          <Svg icon={Icons.Profile} className={styles['icon-active']} />
          profile
        </NavLink>

        <NavLink className={navLinkActiveClasses} to="/leaderboard">
          <Svg icon={Icons.Leaders} className={styles['icon-active']} />
          leaders
        </NavLink>
      </nav>
    </div>
  );
}
