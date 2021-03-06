export const BASE_URL: string = 'https://ya-praktikum.tech/api/v2';
export const OAUTH_URL: string = 'https://oauth.yandex.ru/authorize';
export const TEAM_NAME = 'bugotville';

export const ROUTES = {
  leaderboard: '/leaderboard',
  forum: '/forum',
  newTopic: '/new-topic',
  profile: '/profile',
  login: '/login',
  logout: '/logout',
  register: '/register',
  game: '/game',
  home: '/',
  other: '*',
};

export const REG_EXP_VALIDATE_LOGIN = /^\b[A-Za-z][\w-]+\b$/;
export const REG_EXP_VALIDATE_PASSWORD = /^(?=.*[A-ZА-Я])(?=.*\d).+$/;
export const REG_EXP_VALIDATE_NAME = /^[A-ZА-Яa-zа-я-]*$/;
export const REG_EXP_VALIDATE_EMAIL = /^[\w.-]+@[A-Za-z]+\.[A-Za-z]+$/;
export const REG_EXP_VALIDATE_PHONE = /^\+?[0-9]+$/;
