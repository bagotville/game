export interface ISignupForm {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  repeatPassword?: string;
}

export interface ISigninForm {
  login: string;
  password: string;
}

export interface IUserData {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}
