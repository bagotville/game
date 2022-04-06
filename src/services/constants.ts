export const BASE_URL: string = 'https://ya-praktikum.tech/api/v2';
export const TEAM_NAME = 'bugotville';

export const ROUTES = {
  leaderboard: '/leaderboard',
  forum: '/forum',
  profile: '/profile',
  login: '/login',
  logout: '/logout',
  register: '/register',
  game: '/game',
  home: '/',
};

export const REG_EXP_VALIDATE_LOGIN = /^\b[A-Za-z][\w-]+\b$/;
export const REG_EXP_VALIDATE_PASSWORD = /^(?=.*[A-ZА-Я])(?=.*\d).+$/;
export const REG_EXP_VALIDATE_NAME = /^[A-ZА-Яa-zа-я-]*$/;
export const REG_EXP_VALIDATE_EMAIL = /^[\w.-]+@[A-Za-z]+\.[A-Za-z]+$/;
export const REG_EXP_VALIDATE_PHONE = /^\+?[0-9]+$/;
