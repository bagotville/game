export enum Controls {
  Email = 'email',
  Login = 'login',
  FirstName = 'first name',
  LastName = 'last name',
  DisplayName = 'display name',
  Phone = 'phone',
  Password = 'password',
  PasswordRepeat = 'password repeat',
}

export interface IControl {
  value: string;
  isValid: boolean;
  isInvalid: boolean;
  isDirty: boolean;
  errorMessage: string;
  successMessage: string;
  setValue: (value: string) => void;
}
