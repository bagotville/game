/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable camelcase */
import { useParams } from 'react-router-dom';
import React, { ChangeEventHandler, useRef, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import avatarPlaceholder from '../../assets/images/avatar-placeholder.svg';
import styles from './Topic.scss';
import { Button } from '../../components/Button';
import { TopicProps } from './Topic.types';
import { currentUser } from '../../store/reducers/auth';
import { isDarkScheme } from '../../store/reducers/scheme';
import { getTopic, pushToTopicMessages } from '../../assets/mock-data/forum';
import { formatDate } from '../../helpers';

export function Topic(props: TopicProps) {
  const { className: externalClassName } = props;
  const user = useSelector(currentUser);
  const isDark = useSelector(isDarkScheme);
  const numbersRef = useRef(null);

  const [repliedMessageId, setRepliedMessageId] = useState<null | number>(null);
  const { topicId } = useParams();

  if (topicId === undefined) {
    throw new Error('Почему это у нас топик id undefined??');
  }
  const [topic] = useState(getTopic(topicId));
  const [messageList, updateMessageList] = useState(topic?.messages || []);
  const [userMessage, setUserMessage] = useState('');

  const topicClasses = classNames(styles.topic, externalClassName, {
    [styles.topic_dark]: isDark,
  });
  const linesCount = 99;
  const numbers: number[] = [];
  for (let i = 1; i <= linesCount; i += 1) {
    numbers.push(i);
  }

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const element = event.currentTarget as HTMLTextAreaElement;
    setUserMessage(element.value);
  };

  const scrollHandler = (e: React.UIEvent<HTMLElement>) => {
    if (!numbersRef || !numbersRef.current) return;
    (numbersRef.current as HTMLElement).scrollTo(0, (e.target as HTMLElement).scrollTop);
  };

  const findMessage = (messageId: number) => messageList?.find(({ id }) => id === messageId);

  const submit = () => {
    if (!userMessage.trim()) return;
    if (!user) {
      throw new Error('Каким образом получилось так, что у нас на этом этапе может не быть данных юзера?');
    }

    const message = {
      author_id: user?.id,
      reply_id: repliedMessageId,
      content: userMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setUserMessage('');
    setRepliedMessageId(null);
    pushToTopicMessages(topicId, message);
    updateMessageList(getTopic(topicId)?.messages || []);
  };

  return (
    <div onScroll={scrollHandler} className={topicClasses}>
      <div ref={numbersRef} className={styles.numbers}>
        {numbers.map((number) => (
          <div className={styles.number} key={number}>
            {number}
          </div>
        ))}
      </div>

      <main className={styles.content}>
        <div className={styles.header}>
          Тема:&nbsp;
          <span className={styles['text-white']}>{topic?.title}</span>
        </div>
        <div className={styles.divider}>----------------------</div>

        {messageList?.map(({ id, content, display_name, timestamp, reply_id }) => {
          const formattedStamp = formatDate(timestamp);
          let repliedMessage = null;
          let repliedMessageAuthor = null;
          if (id === undefined) throw new Error('аларям, у сообщения потерялся айдишник, все на поиски');
          if (reply_id !== null) {
            const repliedMessageObj = findMessage(reply_id);
            repliedMessage = repliedMessageObj?.content;
            repliedMessageAuthor = repliedMessageObj?.display_name;
          }
          return (
            <article className={styles.message} key={id} id={`message-${id}`}>
              <header className={styles['message-header']}>
                <img src={avatarPlaceholder} alt="" className={styles['message-avatar']} />
                <div className={styles['message-title-mount']}>
                  <p>
                    {display_name}
                    <span className={styles.secondary}> | user</span>
                  </p>
                  <p className={styles.secondary}>{formattedStamp}</p>
                </div>
                <Button
                  name="Reply"
                  className={styles['message-reply']}
                  onClick={() => {
                    setRepliedMessageId(id);
                  }}
                />
              </header>

              {reply_id !== null ? (
                <a className={styles['replied-message']} href={`#message-${reply_id}`}>
                  <p>{repliedMessageAuthor} пишет:</p>
                  <p>{repliedMessage}</p>
                </a>
              ) : (
                ''
              )}

              <div className={styles['message-body']}>{content}</div>
            </article>
          );
        })}

        <div className={styles.divider}>----------------------</div>
        <form className={styles['reply-area']}>
          <label htmlFor="message-input" className={styles['reply-area-label']}>
            Reply in topic:
          </label>
          <Button name="Send" className={styles['reply-area-button']} onClick={submit} />

          {repliedMessageId !== null ? (
            <div className={styles['replied-message-container']}>
              <a className={styles['replied-message']} href={`#message-${repliedMessageId}`}>
                <p>{findMessage(repliedMessageId)?.display_name} пишет:</p>
                <p>{findMessage(repliedMessageId)?.content}</p>
              </a>
              <Button name="Clear" className={styles['reply-area-clear']} onClick={() => setRepliedMessageId(null)} />
            </div>
          ) : null}

          <textarea
            onChange={handleChange}
            value={userMessage}
            className={styles['reply-area-input']}
            id="message-input"
            placeholder="Пожалуйста, отвечайте строго в тему"
          />
        </form>
      </main>
    </div>
  );
}
