export const BASE_URL: string = 'https://ya-praktikum.tech/api/v2';

export const ROUTES: { [key: string]: string } = {
  leaderboard: '/leaderboard',
  forum: '/forum',
  profile: '/profile',
};

export const REG_EXP_VALIDATE_LOGIN = /^\b[A-Za-z][\w-]+\b$/;
export const REG_EXP_VALIDATE_PASSWORD = /^(?=.*[A-ZА-Я])(?=.*\d).+$/;
export const REG_EXP_VALIDATE_NAME = /^[A-ZА-Яa-zа-я-]*$/;
export const REG_EXP_VALIDATE_EMAIL = /^[\w.-]+@[A-Za-z]+\.[A-Za-z]+$/;
export const REG_EXP_VALIDATE_PHONE = /^\+?[0-9]+$/;
