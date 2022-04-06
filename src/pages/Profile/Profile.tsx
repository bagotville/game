import React, { useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import Dialog from '@reach/dialog';
import { isEqual, range } from 'lodash';
import { toast } from 'react-toastify';
import styles from './Profile.scss';
import { Icons } from '../../components/Svg/Svg.types';
import { Input } from '../../components/Input';
import { Svg } from '../../components/Svg';
import { IPropsProfile } from './Profile.types';
import { BASE_URL, Validator } from '../../services';
import { useValidateForm } from '../../services/hooks/useValidateForm';
import { Button } from '../../components/Button';
import { PROFILE_INPUTS_DATA, PROFILE_INPUTS_PASSWORD } from './Profile.constants';
import { getErrorMessage } from './Profile.helpers';
import { currentUser } from '../../store/reducers/auth';
import { useChangeAvatar } from '../../api/hooks/useChangeAvatar';
import { useChangeUserData } from '../../api/hooks/useChangeUserData';
import { IControls } from '../../services/hooks/useValidateForm/useValidateForm.types';
import { ControlsData, ControlsPass, IChangeUserData, IChangeUserPass } from '../../types/api/user';
import { useChangeUserPass } from '../../api/hooks/useChangeUserPass';

export function Profile(props: IPropsProfile) {
  const { className: externalClassName } = props;
  const profileClasses = classNames(styles.profile, externalClassName);

  const [passValue, setPassValue] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const user = useSelector(currentUser);
  const actualUserData: Partial<IChangeUserData> = {
    [ControlsData.Login]: user?.login,
    [ControlsData.Email]: user?.email,
    [ControlsData.Phone]: user?.phone,
    [ControlsData.DisplayName]: user?.display_name,
    [ControlsData.FirstName]: user?.first_name,
    [ControlsData.SecondName]: user?.second_name,
  };

  const changeAvatar = useChangeAvatar();
  const changeUserData = useChangeUserData();
  const changeUserPass = useChangeUserPass();

  const formData = useValidateForm<IChangeUserData>(getControlsData());
  const formPass = useValidateForm<IChangeUserPass>(getControlsPass());

  function getControlsData(): IControls {
    const { maxLength, minLength, login, phone, email, required, userName } = Validator;
    return {
      [ControlsData.FirstName]: [user?.first_name, [required('First name'), userName]],
      [ControlsData.SecondName]: [user?.second_name, [required('Last name'), userName]],
      [ControlsData.Email]: [user?.email, [required('Email'), email]],
      [ControlsData.DisplayName]: [user?.display_name, [required('Display name'), login, minLength(3), maxLength(20)]],
      [ControlsData.Phone]: [user?.phone, [required('Phone'), phone, minLength(10), maxLength(15)]],
      [ControlsData.Login]: [user?.login, [required('Login'), login, minLength(3), maxLength(20)]],
    };
  }

  function getControlsPass(): IControls {
    const { maxLength, minLength, password, passwordRepeat, required } = Validator;
    return {
      [ControlsPass.OldPassword]: ['', [required('Old password'), password, minLength(8), maxLength(40)]],
      [ControlsPass.NewPassword]: ['', [required('New password'), password, minLength(8), maxLength(40)]],
      [ControlsPass.PasswordRepeat]: ['', [passwordRepeat(passValue)]],
    };
  }

  const resetDataForm = () => {
    formData.controls[ControlsData.Email].setValue(user?.email!);
    formData.controls[ControlsData.DisplayName].setValue(user?.display_name!);
    formData.controls[ControlsData.Phone].setValue(user?.phone!);
    formData.controls[ControlsData.FirstName].setValue(user?.first_name!);
    formData.controls[ControlsData.SecondName].setValue(user?.second_name!);
    formData.controls[ControlsData.Login].setValue(user?.login!);
  };

  const resetPassForm = () => {
    formPass.controls[ControlsPass.NewPassword].setValue('');
    formPass.controls[ControlsPass.OldPassword].setValue('');
    formPass.controls[ControlsPass.PasswordRepeat].setValue('');
  };

  const changeAvatarHandler = () => {
    if (!avatar) return;
    changeAvatar.mutateAsync(avatar, {
      onSuccess: () => {
        setAvatar(null);
        toast.success('Avatar successfully changed');
      },
    });
  };

  const changeDataHandler = () => {
    changeUserData.mutateAsync(formData.value, {
      onSuccess: () => {
        toast.success('Data changed successfully');
      },
    });
  };

  const changePassHandler = () => {
    changeUserPass.mutateAsync(formPass.value, {
      onSuccess: () => {
        toast.success('Password changed successfully');
      },
    });
    resetPassForm();
  };

  const getAvatar = () =>
    user?.avatar ? (
      <img src={`${BASE_URL}/Resources/${user.avatar}`} alt="" />
    ) : (
      <Svg icon={Icons.LogoBug} width={90} height={90} />
    );

  return (
    <div className={profileClasses}>
      {range(1, 30).map((number) => (
        <div className={styles.number} key={number}>
          {number}
        </div>
      ))}

      <div className={styles.header}>Player data - Username</div>
      <div className={styles.divider}>----------------</div>

      <div className={styles['avatar-header']}>## Avatar</div>

      <div className={styles['change-avatar-btn']}>
        <Button name="Change" disabled={!avatar} onClick={changeAvatarHandler} />
        <Button name="Cancel" disabled={!avatar} onClick={() => setAvatar(null)} color="pink" />
      </div>

      <div className={styles['avatar-wrapper']}>
        <div className={styles.avatar} onClick={() => setOpenModal(true)}>
          <div className={styles['avatar-backdrop']}>Change avatar</div>
          {getAvatar()}
        </div>

        {avatar ? (
          <div className={styles['file-name-wrapper']}>
            <Svg icon={Icons.Success} />
            <div className={styles['file-name']}>Selected image {avatar?.name}</div>
          </div>
        ) : null}
      </div>

      <div className={styles['data-header']}>## Data</div>

      <div className={styles['change-data-btn']}>
        <Button
          name="Change"
          onClick={changeDataHandler}
          disabled={formData.isInvalid || isEqual(formData.value, actualUserData)}
        />
        <Button name="Cancel" onClick={resetDataForm} color="pink" disabled={isEqual(formData.value, actualUserData)} />
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
            isValid={control.isValid && control.isDirty && !isEqual(control.value, actualUserData[item.controlName])}
            successMessage={`${item.label} is correct`}
            isInvalid={control.isInvalid && control.isDirty}
            errorMessage={getErrorMessage(control, item.controlName)}
            onInput={(event) => {
              control.setValue((event.target as HTMLInputElement).value);
            }}
          />
        );
      })}

      <div className={styles['pass-header']}>## Password</div>

      <div className={styles['change-pass-btn']}>
        <Button name="Change" onClick={changePassHandler} disabled={formPass.isInvalid || !formPass.isDirty} />
        <Button
          name="Cancel"
          onClick={resetPassForm}
          color="pink"
          disabled={!Object.values(formPass.value).some((i) => i)}
        />
      </div>

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
            isValid={control.isValid && Object.values(formPass.value).some((i) => i)}
            successMessage={`${item.label} is correct`}
            isInvalid={control.isInvalid && Object.values(formPass.value).some((i) => i)}
            errorMessage={getErrorMessage(control, item.controlName)}
            onInput={(event) => {
              control.setValue((event.target as HTMLInputElement).value);

              if (item.controlName === ControlsPass.NewPassword) {
                setPassValue((event.target as HTMLInputElement).value);
              }
            }}
          />
        );
      })}

      <Dialog aria-label="Change avatar" className={classNames(styles.dialog, styles.custom)} isOpen={openModal}>
        <h3>Change avatar</h3>
        <input
          type="file"
          onChange={(e) => {
            setAvatar(e.target.files![0]);
            setOpenModal(false);
          }}
        />
      </Dialog>
    </div>
  );
}
