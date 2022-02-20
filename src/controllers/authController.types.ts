import { IUserData } from '../api/auth/auth.types';

export interface authState {
  isAuth: boolean;
  user?: IUserData;
  error: string;
}
