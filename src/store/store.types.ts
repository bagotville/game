import { IUserData } from '../types/api/auth';

export interface IAuthState {
  error: string;
  isAuth: boolean;
  user?: IUserData;
  serviceId?: string;
}

export interface ISchemeState {
  isDark: boolean;
}
