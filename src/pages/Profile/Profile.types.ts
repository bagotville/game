export interface IProfileInput {
  id: string;
  type: 'text' | 'email' | 'password';
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

export const PROFILE_INPUTS_DATA: IProfileInput[] = [
  {
    id: 'profile-email',
    type: 'email',
    label: 'Email',
    controlName: ControlNames.Email,
    className: 'email',
  },
  {
    id: 'profile-login',
    type: 'text',
    label: 'Login',
    controlName: ControlNames.Login,
    className: 'login',
  },
  {
    id: 'profile-first-name',
    type: 'text',
    label: 'First name',
    controlName: ControlNames.FirstName,
    className: 'first-name',
  },
  {
    id: 'profile-last-name',
    type: 'text',
    label: 'Last name',
    controlName: ControlNames.LastName,
    className: 'last-name',
  },
  {
    id: 'profile-display-name',
    type: 'text',
    label: 'Display name',
    controlName: ControlNames.DisplayName,
    className: 'display-name',
  },
  {
    id: 'profile-phone',
    type: 'text',
    label: 'Phone',
    controlName: ControlNames.Phone,
    className: 'phone',
  },
];

export const PROFILE_INPUTS_PASSWORD: IProfileInput[] = [
  {
    id: 'profile-new-pass',
    type: 'password',
    label: 'New password',
    controlName: ControlNames.NewPassword,
    className: 'new-pass',
  },
  {
    id: 'profile-old-pass',
    type: 'password',
    label: 'Old password',
    controlName: ControlNames.OldPassword,
    className: 'old-pass',
  },
  {
    id: 'profile-repeat-pass',
    type: 'password',
    label: 'Password (repeat)',
    controlName: ControlNames.PasswordRepeat,
    className: 'repeat-pass',
  },
];
