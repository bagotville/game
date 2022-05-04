import { NavLink } from 'react-router-dom';
import React, { useRef } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './Forum.scss';
import { Button } from '../../components/Button';
import { ForumProps } from './Forum.types';
import { isDarkScheme } from '../../store/reducers/scheme';
import { forumList } from '../../assets/mock-data/forum';

export function Forum(props: ForumProps) {
  const { className: externalClassName } = props;

  const isDark = useSelector(isDarkScheme);

  const forumClasses = classNames(styles.forum, externalClassName, {
    [styles.forum_dark]: isDark,
  });

  const topicNameClasses = classNames(styles['topic-name'], {
    [styles['topic-name_dark']]: isDark,
  });

  const numbersRef = useRef(null);

  const linesCount: number = 4 + forumList.length * 3;
  const numbers: number[] = [];
  for (let i = 1; i <= linesCount; i += 1) {
    numbers.push(i);
  }

  const scrollHandler = (e: React.UIEvent<HTMLElement>) => {
    if (!numbersRef || !numbersRef.current) return;
    (numbersRef.current as HTMLElement).scrollTo(0, (e.target as HTMLElement).scrollTop);
  };

  return (
    <div onScroll={scrollHandler} className={forumClasses}>
      <div ref={numbersRef} className={styles.numbers}>
        {numbers.map((number) => (
          <div className={styles.number} key={number}>
            {number}
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>Forum</div>
        <div className={styles.divider}>----------------------</div>
        <Button name="Create topic" className={styles['new-topic']} />

        {forumList.map(({ id, title }) => (
          <div className={styles['forum-card']} key={id}>
            ##&ensp;
            <span className={topicNameClasses}>{title}</span>&ensp;
            <span>| 10 messages</span>&ensp;
            <div className={styles.actions}>
              <NavLink to={`/forum/${id}`}>
                <Button name="Show" className={styles.action} />
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
