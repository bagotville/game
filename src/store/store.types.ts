import { IUserData } from '../types/api/auth';

export interface IState {
  error: string;
  isAuth: boolean;
  user?: IUserData;
  serviceId?: string;
}
