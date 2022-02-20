import { ISigninForm, ISignupForm, IUserData } from './auth.types';
import BaseAPI from '../baseApi';

export default class Auth extends BaseAPI {
  public signup(formValue: ISignupForm): Promise<{ id: number }> {
    return this.http.post('/auth/signup', { ...formValue });
  }

  public signin(formValue: ISigninForm): Promise<'OK'> {
    return this.http.post('/auth/signin', { ...formValue });
  }

  public getUserData(): Promise<IUserData> {
    return this.http.get('/auth/user');
  }

  public logout(): Promise<'OK'> {
    return this.http.post('/auth/logout');
  }
}
