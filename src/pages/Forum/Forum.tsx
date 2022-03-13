import React, { useRef } from 'react';
import classNames from 'classnames';
import styles from './Forum.scss';
import { Button } from '../../components/Button';

interface Props {
  className: string;
}

export function Forum(props: Props) {
  const { className: externalClassName } = props;
  const forumClasses = classNames(styles.forum, externalClassName);

  const numbersRef = useRef(null);

  const numbers: number[] = [];
  for (let i = 1; i <= 500; i += 1) {
    numbers.push(i);
  }

  const scrollHandler = (e: React.UIEvent<HTMLElement>) => {
    if (!numbersRef || !numbersRef.current) return;
    (numbersRef.current as HTMLElement).scrollTo(
      0,
      (e.target as HTMLElement).scrollTop,
    );
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

        <div className={styles['forum-card']}>
          ##&ensp;
          <span className={styles['topic-name']}>Free communication</span>&ensp;
          <span>| 236 topics</span>&ensp;
          <span>| 14543 messages</span>&ensp;
          <div className={styles.actions}>
            <Button name="Show all" className={styles.action} />
            <Button name="New topic" className={styles.action} color="yellow" />
          </div>
        </div>
      </div>
    </div>
  );
}
