import React from 'react';
import styles from './Profile.scss';
import { Icons } from '../../components/Svg/Svg.types';
import { Input } from '../../components/Input';
import { Svg } from '../../components/Svg';
import { useValidate } from '../../services/hooks/useValidate/useValidate';
import { Controls } from '../../services/hooks/useValidate/types';

export function Profile() {
  const emailControl = useValidate(Controls.Email);
  const firstNameControl = useValidate(Controls.FirstName);
  const lastNameControl = useValidate(Controls.LastName);
  const loginControl = useValidate(Controls.Login);
  const phoneControl = useValidate(Controls.Phone);
  const displayNameControl = useValidate(Controls.DisplayName);

  const passwordControl = useValidate(Controls.Password);
  const repeatPassControl = useValidate(Controls.PasswordRepeat);
  const oldPasswordControl = useValidate(Controls.Password);

  const numbers: number[] = [];

  for (let i = 1; i <= 30; i += 1) {
    numbers.push(i);
  }

  return (
    <div className={styles.profile}>
      {numbers.map((number) => (
        <div className={styles.number} key={number}>
          {number}
        </div>
      ))}

      <div className={styles.header}>Player data - Username</div>
      <div className={styles.divider}>----------------</div>

      <div className={styles['avatar-header']}>## Avatar</div>

      <div className={styles['change-avatar-btn']}>
        <div className={styles['change-button']}>
          [ <span>Change</span> ]
        </div>
        <div>
          [ <span className={styles['cancel-button']}>Cancel</span> ]
        </div>
      </div>

      <div className={styles['avatar-wrapper']}>
        <div className={styles.avatar}>
          <Svg icon={Icons.LogoBug} width={90} height={90} />
        </div>
      </div>

      <div className={styles['data-header']}>## Data</div>

      <div className={styles['change-data-btn']}>
        <div className={styles['change-button']}>
          [ <span>Change</span> ]
        </div>
        <div>
          [ <span className={styles['cancel-button']}>Cancel</span> ]
        </div>
      </div>

      <div className={styles['first-row-inputs']}>
        <Input
          id="profile-login"
          type="text"
          value={loginControl.value}
          label="Login"
          isValid={loginControl.isValid && loginControl.isDirty}
          successMessage={loginControl.successMessage}
          isInvalid={loginControl.isInvalid && loginControl.isDirty}
          errorMessage={loginControl.errorMessage}
          onInput={(event) => {
            loginControl.setValue((event.target as HTMLInputElement).value);
          }}
        />

        <Input
          id="profile-display-name"
          type="text"
          value={displayNameControl.value}
          label="Display name"
          isValid={displayNameControl.isValid && displayNameControl.isDirty}
          successMessage={displayNameControl.successMessage}
          isInvalid={displayNameControl.isInvalid && displayNameControl.isDirty}
          errorMessage={displayNameControl.errorMessage}
          onInput={(event) => {
            displayNameControl.setValue(
              (event.target as HTMLInputElement).value,
            );
          }}
        />
      </div>

      <div className={styles['second-row-inputs']}>
        <Input
          id="profile-first-name"
          type="text"
          value={firstNameControl.value}
          label="First name"
          isValid={firstNameControl.isValid && firstNameControl.isDirty}
          successMessage={firstNameControl.successMessage}
          isInvalid={firstNameControl.isInvalid && firstNameControl.isDirty}
          errorMessage={firstNameControl.errorMessage}
          onInput={(e) => {
            firstNameControl.setValue((e.target as HTMLInputElement).value);
          }}
        />

        <Input
          id="profile-last-name"
          type="text"
          value={lastNameControl.value}
          label="Last name"
          isValid={lastNameControl.isValid && lastNameControl.isDirty}
          successMessage={lastNameControl.successMessage}
          isInvalid={lastNameControl.isInvalid && lastNameControl.isDirty}
          errorMessage={lastNameControl.errorMessage}
          onInput={(e) => {
            lastNameControl.setValue((e.target as HTMLInputElement).value);
          }}
        />
      </div>

      <div className={styles['third-row-inputs']}>
        <Input
          id="profile-email"
          value={emailControl.value}
          type="email"
          label="Email"
          isValid={emailControl.isValid && emailControl.isDirty}
          successMessage={emailControl.successMessage}
          isInvalid={emailControl.isInvalid && emailControl.isDirty}
          errorMessage={emailControl.errorMessage}
          onInput={(event) => {
            emailControl.setValue((event.target as HTMLInputElement).value);
          }}
        />

        <Input
          id="profile-phone"
          value={phoneControl.value}
          type="text"
          label="Phone"
          isValid={phoneControl.isValid && phoneControl.isDirty}
          successMessage={phoneControl.successMessage}
          isInvalid={phoneControl.isInvalid && phoneControl.isDirty}
          errorMessage={phoneControl.errorMessage}
          onInput={(event) => {
            phoneControl.setValue((event.target as HTMLInputElement).value);
          }}
        />
      </div>

      <div className={styles['pass-header']}>## Password</div>

      <div className={styles['change-pass-btn']}>
        <div className={styles['change-button']}>
          [ <span>Change</span> ]
        </div>
        <div>
          [ <span className={styles['cancel-button']}>Cancel</span> ]
        </div>
      </div>

      <div className={styles['fourth-row-inputs']}>
        <Input
          id="profile-new-pass"
          value={passwordControl.value}
          type="password"
          label="New password"
          isValid={passwordControl.isValid && passwordControl.isDirty}
          successMessage={passwordControl.successMessage}
          isInvalid={passwordControl.isInvalid && passwordControl.isDirty}
          errorMessage={passwordControl.errorMessage}
          onInput={(event) => {
            passwordControl.setValue((event.target as HTMLInputElement).value);
          }}
        />

        <Input
          id="profile-repeat-pass"
          value={repeatPassControl.value}
          type="password"
          label="Password (Repeat)"
          isValid={
            repeatPassControl.value === passwordControl.value &&
            repeatPassControl.isDirty &&
            !!repeatPassControl.value
          }
          successMessage={repeatPassControl.successMessage}
          isInvalid={
            repeatPassControl.value !== passwordControl.value &&
            repeatPassControl.isDirty
          }
          errorMessage="Passwords mismatch"
          onInput={(event) => {
            repeatPassControl.setValue(
              (event.target as HTMLInputElement).value,
            );
          }}
        />
      </div>

      <div className={styles['fifth-row-inputs']}>
        <Input
          id="profile-old-pass"
          value={oldPasswordControl.value}
          type="password"
          label="Old password"
          isValid={oldPasswordControl.isValid && oldPasswordControl.isDirty}
          successMessage={oldPasswordControl.successMessage}
          isInvalid={oldPasswordControl.isInvalid && oldPasswordControl.isDirty}
          errorMessage={oldPasswordControl.errorMessage}
          onInput={(event) => {
            oldPasswordControl.setValue(
              (event.target as HTMLInputElement).value,
            );
          }}
        />
      </div>
    </div>
  );
}
