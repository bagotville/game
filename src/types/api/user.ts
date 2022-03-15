export enum ControlsData {
  Email = 'email',
  Login = 'login',
  FirstName = 'first_name',
  SecondName = 'second_name',
  DisplayName = 'display_name',
  Phone = 'phone',
}

export enum ControlsPass {
  OldPassword = 'oldPassword',
  NewPassword = 'newPassword',
  PasswordRepeat = 'passwordRepeat',
}

export interface IChangeUserData {
  [ControlsData.FirstName]: string;
  [ControlsData.SecondName]: string;
  [ControlsData.DisplayName]: string;
  [ControlsData.Login]: string;
  [ControlsData.Email]: string;
  [ControlsData.Phone]: string;
}

export interface IChangeUserPass {
  [ControlsPass.OldPassword]: string;
  [ControlsPass.NewPassword]: string;
  [ControlsPass.PasswordRepeat]?: string;
}
