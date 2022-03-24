import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './Profile.scss';
import { Icons } from '../../components/Svg/Svg.types';
import { Input } from '../../components/Input';
import { Svg } from '../../components/Svg';
import { ControlNames, IPropsProfile } from './Profile.types';
import { Validator } from '../../services';
import { useValidateForm } from '../../services/hooks/useValidateForm';
import { IControlInfo } from '../../services/hooks/useValidateControl/useValidateContol.types';
import { Button } from '../../components/Button';
import { PROFILE_INPUTS_DATA, PROFILE_INPUTS_PASSWORD } from './Profile.constants';

function getErrorMessage(control: IControlInfo, controlName: ControlNames): string {
  const { errors } = control;

  if (controlName === ControlNames.Login) {
    return errors.required || errors.minLength || errors.maxLength || errors.login;
  }
  if (controlName === ControlNames.DisplayName) {
    return errors.required || errors.minLength || errors.maxLength || errors.login;
  }
  if (controlName === ControlNames.FirstName) {
    return errors.required || errors.userName;
  }
  if (controlName === ControlNames.LastName) {
    return errors.required || errors.userName;
  }
  if (controlName === ControlNames.Email) {
    return errors.required || errors.email;
  }
  if (controlName === ControlNames.Phone) {
    return errors.required || errors.minLength || errors.maxLength || errors.phone;
  }
  if (controlName === ControlNames.NewPassword) {
    return errors.required || errors.minLength || errors.maxLength || errors.password;
  }
  if (controlName === ControlNames.OldPassword) {
    return errors.required || errors.minLength || errors.maxLength || errors.password;
  }
  return errors.passwordRepeat;
}

export function Profile(props: IPropsProfile) {
  const { className: externalClassName } = props;
  const profileClasses = classNames(styles.profile, externalClassName);

  const [passValue, setPassValue] = useState('');

  const formData = useValidateForm({
    [ControlNames.FirstName]: ['Ivan', [Validator.required('First name'), Validator.userName]],
    [ControlNames.LastName]: ['Ivanov', [Validator.required('Last name'), Validator.userName]],
    [ControlNames.Email]: ['ivanov321@yandex.ru', [Validator.required('Email'), Validator.email]],
    [ControlNames.DisplayName]: [
      'Ivan',
      [Validator.required('Display name'), Validator.login, Validator.minLength(3), Validator.maxLength(20)],
    ],
    [ControlNames.Phone]: [
      '8432442334423',
      [Validator.required('Phone'), Validator.phone, Validator.minLength(10), Validator.maxLength(15)],
    ],
    [ControlNames.Login]: [
      'Ivan123',
      [Validator.required('Login'), Validator.login, Validator.minLength(3), Validator.maxLength(20)],
    ],
  });

  const formPass = useValidateForm({
    [ControlNames.OldPassword]: [
      '',
      [Validator.required('Old password'), Validator.password, Validator.minLength(8), Validator.maxLength(40)],
    ],
    [ControlNames.NewPassword]: [
      '',
      [Validator.required('New password'), Validator.password, Validator.minLength(8), Validator.maxLength(40)],
    ],
    [ControlNames.PasswordRepeat]: ['', [Validator.passwordRepeat(passValue)]],
  });

  const numbers: number[] = [];

  for (let i = 1; i <= 30; i += 1) {
    numbers.push(i);
  }

  return (
    <div className={profileClasses}>
      {numbers.map((number) => (
        <div className={styles.number} key={number}>
          {number}
        </div>
      ))}

      <div className={styles.header}>Player data - Username</div>
      <div className={styles.divider}>----------------</div>

      <div className={styles['avatar-header']}>## Avatar</div>

      <div className={styles['change-avatar-btn']}>
        <Button name="Change" />
        <Button name="Cancel" color="pink" />
      </div>

      <div className={styles['avatar-wrapper']}>
        <div className={styles.avatar}>
          <Svg icon={Icons.LogoBug} width={90} height={90} />
        </div>
      </div>

      <div className={styles['data-header']}>## Data</div>

      <div className={styles['change-data-btn']}>
        <Button name="Change" disabled={formData.isInvalid || !formData.isDirty} />
        <Button name="Cancel" color="pink" disabled={!formData.isDirty} />
      </div>

      <div className={styles['pass-header']}>## Password</div>

      <div className={styles['change-pass-btn']}>
        <Button name="Change" disabled={formPass.isInvalid || !formPass.isDirty} />
        <Button name="Cancel" color="pink" disabled={!formPass.isDirty} />
      </div>

      {PROFILE_INPUTS_DATA.map((item) => {
        const control = formData.controls[item.controlName];

        return (
          <Input
            id={item.id}
            key={item.id}
            type={item.type}
            label={item.label}
            className={item.className}
            value={control.value}
            isValid={control.isValid && control.isDirty}
            successMessage={`${item.label} is correct`}
            isInvalid={control.isInvalid && control.isDirty}
            errorMessage={getErrorMessage(control, item.controlName)}
            onInput={(event) => {
              control.setValue((event.target as HTMLInputElement).value);
            }}
          />
        );
      })}

      {PROFILE_INPUTS_PASSWORD.map((item) => {
        const control = formPass.controls[item.controlName];

        return (
          <Input
            id={item.id}
            key={item.id}
            label={item.label}
            type={item.type}
            className={item.className}
            value={control.value}
            isValid={control.isValid && control.isDirty}
            successMessage={`${item.label} is correct`}
            isInvalid={control.isInvalid && control.isDirty}
            errorMessage={getErrorMessage(control, item.controlName)}
            onInput={(event) => {
              control.setValue((event.target as HTMLInputElement).value);

              if (item.controlName === ControlNames.NewPassword) {
                setPassValue((event.target as HTMLInputElement).value);
              }
            }}
          />
        );
      })}
    </div>
  );
}
