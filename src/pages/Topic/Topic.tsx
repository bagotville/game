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
import { getTopic, messages as topicMessageList, pushToMessage, Message } from '../../assets/mock-data/forum';

/**
 * TODO:
 * → Отправка сообщения в массив +
 * → Разделение массива сообщений на топики
 * → Страница с созданием новой темы
 * → Отправка новой темы в массив
 * → Fake API с получением тем
 * → Fake API с получением внутренностей тем
 */

function formatDate(timestamp: string) {
  const date = new Date(timestamp);
  let dayOfMonth: string | number = date.getDate();
  let month: string | number = date.getMonth() + 1;
  let year: string | number = date.getFullYear();
  let hour: string | number = date.getHours();
  let minutes: string | number = date.getMinutes();
  const diffMs = Number(new Date()) - Number(date);
  const diffSec = Math.round(diffMs / 1000);
  const diffMin = Math.round(diffSec / 60);
  const diffHour = Math.round(diffMin / 60);

  year = year.toString().slice(-2);
  month = month < 10 ? `0${month}` : month;
  dayOfMonth = dayOfMonth < 10 ? `0${dayOfMonth}` : dayOfMonth;
  hour = hour < 10 ? `0${hour}` : hour;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  if (diffMin < 1) {
    return `только что`;
  }
  if (diffHour < 1) {
    return `${diffMin} минут назад`;
  }
  if (diffHour < 24) {
    return `${hour}:${minutes}`;
  }
  return `${dayOfMonth}.${month}.${year} ${hour}:${minutes}`;
}

const findMessage = (messageId: number) => topicMessageList.find(({ id }) => id === messageId);

export function Topic(props: TopicProps) {
  const { className: externalClassName } = props;
  const { topicId } = useParams();
  if (topicId === undefined) {
    throw new Error('Почему это у нас топик id undefined??');
  }
  const user = useSelector(currentUser);
  const isDark = useSelector(isDarkScheme);
  const numbersRef = useRef(null);

  const [repliedMessageId, setRepliedMessageId] = useState(null);
  const [userMessage, setUserMessage] = useState('');
  const [messageList, updateMessageList] = useState(topicMessageList);

  const topicClasses = classNames(styles.topic, externalClassName, {
    [styles.topic_dark]: isDark,
  });
  const linesCount = 99;
  const numbers: number[] = [];
  for (let i = 1; i <= linesCount; i += 1) {
    numbers.push(i);
  }

  const scrollHandler = (e: React.UIEvent<HTMLElement>) => {
    if (!numbersRef || !numbersRef.current) return;
    (numbersRef.current as HTMLElement).scrollTo(0, (e.target as HTMLElement).scrollTop);
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    const element = event.currentTarget as HTMLTextAreaElement;
    setUserMessage(element.value);
  };

  const submit = () => {
    if (!user) {
      throw new Error('Каким образом получилось так, что у нас на этом этапе может не быть данных юзера?');
    }
    const message: Message = {
      author_id: user?.id,
      reply_id: repliedMessageId,
      content:
        userMessage.trim() ||
        'чел, ну не отправляй пустые сообщения, видишь же, что не допилили форум ещё, чего ты, ну',
      timestamp: new Date().toISOString(),
    };

    setUserMessage('');
    setRepliedMessageId(null);
    pushToMessage(message);
    updateMessageList(topicMessageList);
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
          <span className={styles['text-white']}>{getTopic(topicId)}</span>
        </div>
        <div className={styles.divider}>----------------------</div>

        {messageList.map(({ id, content, display_name, timestamp, reply_id }) => {
          const formattedStamp = formatDate(timestamp);
          let repliedMessage = null;
          let repliedMessageAuthor = null;
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
                <Button name="Reply" className={styles['message-reply']} onClick={() => setRepliedMessageId(id)} />
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
          ) : (
            ''
          )}

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
