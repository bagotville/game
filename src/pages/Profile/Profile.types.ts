import { InputTypes } from '../../components/Input/Input.types';

export interface IPropsProfile {
  className?: string;
}

export interface IProfileInput {
  id: string;
  type: InputTypes;
  label: string;
  controlName: ControlNames;
  className: string;
}

export enum ControlNames {
  Email = 'email',
  Login = 'login',
  FirstName = 'first name',
  LastName = 'last name',
  DisplayName = 'display name',
  Phone = 'phone',
  OldPassword = 'old password',
  NewPassword = 'new password',
  PasswordRepeat = 'password repeat',
}
