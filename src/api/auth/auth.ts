import { ISigninForm, ISignupForm, IUserData } from './auth.types';
import http from '../../utils/axios/axios.service';

export default class Auth {
  static signup(formValue: ISignupForm): Promise<{ id: number }> {
    return http.post('/auth/signup', { ...formValue });
  }

  static signin(formValue: ISigninForm): Promise<'OK'> {
    return http.post('/auth/signin', { ...formValue });
  }

  static getUserData(): Promise<IUserData> {
    return http.get('/auth/user');
  }

  static logout(): Promise<'OK'> {
    return http.post('/auth/logout');
  }
}
