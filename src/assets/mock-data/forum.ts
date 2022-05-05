/* eslint-disable camelcase */
interface Message {
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
  messages: Message[];
}

const topics: Topic[] = [
  {
    id: 0,
    title: 'Как пропатчить KDE под FreeBSD',
    messages: [
      {
        id: 0,
        reply_id: null,
        display_name: 'KDE_KDE',
        content: 'KDE',
        timestamp: '2020-05-03T08:19:23.953Z',
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
        timestamp: '2022-05-03T09:20:23.953Z',
      },
      {
        id: 3,
        reply_id: 2,
        display_name: 'Василь Иваныч',
        content: 'string',
        timestamp: '2022-05-04T09:19:23.953Z',
      },
    ],
  },
  {
    id: 1,
    title: 'Рандомная тема',
    messages: [
      {
        id: 0,
        reply_id: null,
        display_name: 'Рандомная_тема',
        content: 'KDE',
        timestamp: '2020-05-03T09:19:23.953Z',
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
        timestamp: '2022-05-04T09:19:23.953Z',
      },
    ],
  },
  {
    id: 2,
    title: 'От создателя «Рандомная тема»: Рандомная тема 2',
    messages: [
      {
        id: 0,
        reply_id: null,
        display_name: 'От_создателя',
        content: 'KDE',
        timestamp: '2020-05-03T08:19:23.953Z',
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
        timestamp: '2022-05-03T09:19:25.953Z',
      },
      {
        id: 3,
        reply_id: 2,
        display_name: 'Василь Иваныч',
        content: 'string',
        timestamp: '2022-05-04T12:19:23.953Z',
      },
    ],
  },
];

export const getForumList = () => topics.map(({ id, title }) => ({ id, title }));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const pushToTopicMessages = (topicId: number | string, { author_id, reply_id, content, timestamp }: Message) => {
  if (!author_id) throw new Error('ну надо же, такое важное поле не пришло');
  const topic = getTopic(topicId);
  if (!topic) throw new Error('не найден топик');
  const display_name = 'Current_User';
  const id = topic.messages.length;
  topic.messages.push({ id, display_name, reply_id, content, timestamp });
};

export const getTopic = (topicId: string | number) => topics.find(({ id }) => id === Number(topicId));
