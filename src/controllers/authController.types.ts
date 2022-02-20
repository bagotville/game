import { IUserData } from '../api/auth';

export interface authState {
  isAuth: boolean;
  user?: IUserData;
  error: string;
}
