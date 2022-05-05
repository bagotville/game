/* eslint-disable jsx-a11y/label-has-associated-control */
import { useNavigate } from 'react-router-dom';
import React, { ChangeEventHandler, useRef, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import styles from './NewTopic.scss';
import { Button } from '../../components/Button';
import { TopicProps } from './NewTopic.types';
import { currentUser } from '../../store/reducers/auth';
import { isDarkScheme } from '../../store/reducers/scheme';
import { createNewTopic } from '../../assets/mock-data/forum';

export function NewTopic(props: TopicProps) {
  const { className: externalClassName } = props;
  const user = useSelector(currentUser);
  const isDark = useSelector(isDarkScheme);
  const numbersRef = useRef(null);
  const [topicMessage, setTopicMessage] = useState('');
  const [topicTitle, setTopicTitle] = useState('');
  const topicClasses = classNames(styles.topic, externalClassName, {
    [styles.topic_dark]: isDark,
  });
  const navigate = useNavigate();
  const linesCount = 99;
  const numbers: number[] = [];

  for (let i = 1; i <= linesCount; i += 1) {
    numbers.push(i);
  }

  const handleMessageChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const element = event.currentTarget as HTMLTextAreaElement;
    setTopicMessage(element.value);
  };

  const handleTitleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const element = event.currentTarget as unknown as HTMLTextAreaElement;
    setTopicTitle(element.value);
  };

  const submit = () => {
    if (!topicMessage || !topicTitle) return;
    if (!user) throw new Error('где-то потеряли юзера');
    const newTopic = {
      title: topicTitle,
      first_message: {
        author_id: user.id,
        content: topicMessage,
        timestamp: new Date().toISOString(),
      },
    };
    setTopicMessage('');
    setTopicTitle('');
    const topicId = createNewTopic(newTopic);
    navigate(`/forum/${topicId}`);
  };

  return (
    <div className={topicClasses}>
      <div ref={numbersRef} className={styles.numbers}>
        {numbers.map((number) => (
          <div className={styles.number} key={number}>
            {number}
          </div>
        ))}
      </div>

      <main className={styles.content}>
        <div className={styles.heading}>Create new topic</div>
        <div className={styles.divider}>----------------------</div>

        <form className={styles.form}>
          <label className={styles.control}>
            Topic title:
            <input type="text" onChange={handleTitleChange} className={styles['control-input']} value={topicTitle} />
          </label>
          <label className={styles.control}>
            First message:
            <textarea onChange={handleMessageChange} className={styles['control-input']} value={topicMessage} />
          </label>
          <Button name="Create" className={styles['submit-button']} onClick={submit} />
        </form>
      </main>
    </div>
  );
}
