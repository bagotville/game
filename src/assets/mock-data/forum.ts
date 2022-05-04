/* eslint-disable camelcase */
export interface Message {
  id?: number;
  author_id?: number;
  display_name?: string;
  reply_id: number | null;
  content: string;
  timestamp: string;
}

interface Topic {
  id: number;
  title: string;
}

export const forumList: Topic[] = [
  {
    id: 0,
    title: 'Как пропатчить KDE под FreeBSD',
  },
  {
    id: 1,
    title: 'Рандомная тема',
  },
  {
    id: 2,
    title: 'От создателя «Рандомная тема»: Рандомная тема 2',
  },
];

export const messages: Message[] = [
  {
    id: 0,
    reply_id: null,
    display_name: 'Василь Иваныч',
    content: 'string',
    timestamp: new Date().toISOString(),
  },
  {
    id: 1,
    reply_id: 2,
    display_name: 'Василь Иваныч',
    content: `Субъект власти, несмотря на внешние воздействия, притягивает 
      ничтожный закон. Свойство возникает конфиденциальный объект права. 
      Как мы уже знаем, механизм власти пространственно представляет собой 
      договорный желтозём. Обязательство, учитывая отсутствие в законе норм, 
      посвященных данному вопросу, однозначно поглощает авторитаризм. 
      Агробиогеоценоз доказывает депозитный кредитор.`,
    timestamp: '2022-05-03T09:19:23.953Z',
  },
  {
    id: 2,
    reply_id: null,
    display_name: 'Василь Иваныч',
    content: `Субъект власти, несмотря на внешние воздействия, притягивает 
      ничтожный закон. Свойство возникает конфиденциальный объект права. 
      Как мы уже знаем, механизм власти пространственно представляет собой 
      договорный желтозём. Обязательство, учитывая отсутствие в законе норм, 
      посвященных данному вопросу, однозначно поглощает авторитаризм. 
      Агробиогеоценоз доказывает депозитный кредитор. Субъект власти, несмотря 
      на внешние воздействия, притягивает 
      ничтожный закон. Свойство возникает конфиденциальный объект права. 
      Как мы уже знаем, механизм власти пространственно представляет собой 
      договорный желтозём. Обязательство, учитывая отсутствие в законе норм, 
      посвященных данному вопросу, однозначно поглощает авторитаризм. 
      Агробиогеоценоз доказывает депозитный кредитор.`,
    timestamp: '2022-05-03T09:19:23.953Z',
  },
  {
    id: 3,
    reply_id: 2,
    display_name: 'Василь Иваныч',
    content: 'string',
    timestamp: '2022-01-03T09:19:23.953Z',
  },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const pushToMessage = ({ author_id, reply_id, content, timestamp }: Message) => {
  const display_name = 'Current_User';
  const id = messages.length;
  messages.push({ id, display_name, reply_id, content, timestamp });
};

export const getTopic = (topicId: string | number) => forumList.find(({ id }) => id === Number(topicId))?.title;
