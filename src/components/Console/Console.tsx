import React from 'react';
import classNames from 'classnames';
import { DEFAULT_HEIGHT, DEFAULT_WIDTH } from './Console.constant';
import styles from './Console.style.scss';
import { IConsoleProps } from './console.types';

export default function Console(props: IConsoleProps) {
  const {
    tabs,
    header,
    children,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    hidden = false,
    enabled = true,
  } = props;
  const isTabsExists = tabs && tabs.length > 0;

  return (
    <div className={styles['console-wrapper']}>
      <div className={styles.backdrop} />

      <div
        className={classNames(styles['console-window'], enabled ? null : styles.disabled)}
        hidden={hidden}
        style={{ width, height }}>
        <div className={styles['console-header']}>
          <div>
            <h4>{header}</h4>
          </div>
          {isTabsExists ? (
            <div className={styles['tab-container']}>
              <ul>
                {tabs.map((tab) => (
                  <li
                    className={tab.selected ? [styles.tab, styles['tab-selected']].join(' ') : styles.tab}
                    key={tab.name}>
                    <a href={tab.href} key={tab.href}>
                      {tab.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
        <div className={styles['console-content']}>{children}</div>
      </div>
    </div>
  );
}
