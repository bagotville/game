import { InputTypes } from '../../components/Input/Input.types';
import { IProfileInput } from './Profile.types';
import styles from './Profile.scss';
import { ControlsData, ControlsPass } from '../../types/api/user';

export const PROFILE_INPUTS_DATA: IProfileInput<ControlsData>[] = [
  {
    id: 'profile-login',
    type: InputTypes.Text,
    label: 'Login',
    controlName: ControlsData.Login,
    className: styles.login,
  },
  {
    id: 'profile-display-name',
    type: InputTypes.Text,
    label: 'Display name',
    controlName: ControlsData.DisplayName,
    className: styles['display-name'],
  },
  {
    id: 'profile-first-name',
    type: InputTypes.Text,
    label: 'First name',
    controlName: ControlsData.FirstName,
    className: styles['first-name'],
  },
  {
    id: 'profile-last-name',
    type: InputTypes.Text,
    label: 'Last name',
    controlName: ControlsData.SecondName,
    className: styles['last-name'],
  },
  {
    id: 'profile-email',
    type: InputTypes.Email,
    label: 'Email',
    controlName: ControlsData.Email,
    className: styles.email,
  },
  {
    id: 'profile-phone',
    type: InputTypes.Text,
    label: 'Phone',
    controlName: ControlsData.Phone,
    className: styles.phone,
  },
];

export const PROFILE_INPUTS_PASSWORD: IProfileInput<ControlsPass>[] = [
  {
    id: 'profile-new-pass',
    type: InputTypes.Password,
    label: 'New password',
    controlName: ControlsPass.NewPassword,
    className: styles['new-pass'],
  },
  {
    id: 'profile-repeat-pass',
    type: InputTypes.Password,
    label: 'Password (repeat)',
    controlName: ControlsPass.PasswordRepeat,
    className: styles['repeat-pass'],
  },
  {
    id: 'profile-old-pass',
    type: InputTypes.Password,
    label: 'Old password',
    controlName: ControlsPass.OldPassword,
    className: styles['old-pass'],
  },
];
