import { InputTypes } from '../../components/Input/Input.types';
import { ControlNames, IProfileInput } from './Profile.types';
import styles from './Profile.scss';

export const PROFILE_INPUTS_DATA: IProfileInput[] = [
  {
    id: 'profile-login',
    type: InputTypes.Text,
    label: 'Login',
    controlName: ControlNames.Login,
    className: styles.login,
  },
  {
    id: 'profile-display-name',
    type: InputTypes.Text,
    label: 'Display name',
    controlName: ControlNames.DisplayName,
    className: styles['display-name'],
  },
  {
    id: 'profile-first-name',
    type: InputTypes.Text,
    label: 'First name',
    controlName: ControlNames.FirstName,
    className: styles['first-name'],
  },
  {
    id: 'profile-last-name',
    type: InputTypes.Text,
    label: 'Last name',
    controlName: ControlNames.LastName,
    className: styles['last-name'],
  },
  {
    id: 'profile-email',
    type: InputTypes.Email,
    label: 'Email',
    controlName: ControlNames.Email,
    className: styles.email,
  },
  {
    id: 'profile-phone',
    type: InputTypes.Text,
    label: 'Phone',
    controlName: ControlNames.Phone,
    className: styles.phone,
  },
];

export const PROFILE_INPUTS_PASSWORD: IProfileInput[] = [
  {
    id: 'profile-new-pass',
    type: InputTypes.Password,
    label: 'New password',
    controlName: ControlNames.NewPassword,
    className: styles['new-pass'],
  },
  {
    id: 'profile-repeat-pass',
    type: InputTypes.Password,
    label: 'Password (repeat)',
    controlName: ControlNames.PasswordRepeat,
    className: styles['repeat-pass'],
  },
  {
    id: 'profile-old-pass',
    type: InputTypes.Password,
    label: 'Old password',
    controlName: ControlNames.OldPassword,
    className: styles['old-pass'],
  },
];
