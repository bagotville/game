import { useState } from 'react';
import {
  REG_EXP_VALIDATE_EMAIL,
  REG_EXP_VALIDATE_LOGIN,
  REG_EXP_VALIDATE_NAME,
  REG_EXP_VALIDATE_PASSWORD,
  REG_EXP_VALIDATE_PHONE,
} from '../../constants';
import { ucOnlyFirstLetter } from '../../../helpers/ucOnlyFirstLetter';
import { Controls, IControl } from './types';

export function useValidate(
  controlName: Controls,
  initialValue: string = '',
): IControl {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const controlData = {
    value,
    errorMessage,
    isDirty,
  };

  if (controlName === Controls.Email) {
    return {
      ...controlData,
      isValid: REG_EXP_VALIDATE_EMAIL.test(value),
      isInvalid: !REG_EXP_VALIDATE_EMAIL.test(value),
      successMessage: 'Email is correct',
      setValue: (value: string) => {
        setIsDirty(true);
        setValue(value);

        if (value) {
          setErrorMessage('Email is invalid');
          return;
        }

        setErrorMessage('Email cannot be empty');
      },
    };
  }

  if (controlName === Controls.FirstName) {
    return {
      ...controlData,
      isValid: REG_EXP_VALIDATE_NAME.test(value),
      isInvalid: !REG_EXP_VALIDATE_NAME.test(value),
      successMessage: 'First name is correct',
      setValue: (value: string) => {
        value = /([^A-Za-zА-Яа-я-])/[Symbol.replace](value, '');

        setIsDirty(true);
        setValue(ucOnlyFirstLetter(value));

        if (value) {
          setErrorMessage('First name is invalid');
          return;
        }

        setErrorMessage('First name cannot be empty');
      },
    };
  }

  if (controlName === Controls.LastName) {
    return {
      ...controlData,
      isValid: REG_EXP_VALIDATE_NAME.test(value),
      isInvalid: !REG_EXP_VALIDATE_NAME.test(value),
      successMessage: 'Last name is correct',
      setValue: (value: string) => {
        value = /([^A-Za-zА-Яа-я-])/[Symbol.replace](value, '');

        setIsDirty(true);
        setValue(ucOnlyFirstLetter(value));

        if (value) {
          setErrorMessage('Last name is invalid');
          return;
        }

        setErrorMessage('Last name cannot be empty');
      },
    };
  }

  if (controlName === Controls.Login) {
    return {
      ...controlData,
      isValid: REG_EXP_VALIDATE_LOGIN.test(value),
      isInvalid: !REG_EXP_VALIDATE_LOGIN.test(value),
      successMessage: 'Login is correct',
      setValue: (value: string) => {
        setIsDirty(true);
        setValue(value);

        if (value && (value.length < 3 || value.length > 20)) {
          setErrorMessage('Length from 3 to 20 characters');
          return;
        }

        if (value) {
          setErrorMessage('Only Latin letters and numbers');
          return;
        }

        setErrorMessage('First name cannot be empty');
      },
    };
  }

  if (controlName === Controls.DisplayName) {
    return {
      ...controlData,
      isValid: REG_EXP_VALIDATE_LOGIN.test(value),
      isInvalid: !REG_EXP_VALIDATE_LOGIN.test(value),
      successMessage: 'Display name is correct',
      setValue: (value: string) => {
        setIsDirty(true);
        setValue(value);

        if (value && (value.length < 3 || value.length > 20)) {
          setErrorMessage('Length from 3 to 20 characters');
          return;
        }

        if (value) {
          setErrorMessage('Only Latin letters and numbers');
          return;
        }

        setErrorMessage('Display name cannot be empty');
      },
    };
  }

  if (controlName === Controls.Phone) {
    return {
      ...controlData,
      isValid: REG_EXP_VALIDATE_PHONE.test(value),
      isInvalid: !REG_EXP_VALIDATE_PHONE.test(value),
      successMessage: 'Display name is correct',
      setValue: (value: string) => {
        value = /[^0-9+]/[Symbol.replace](value, '');

        setIsDirty(true);
        setValue(value);

        if (value && (value.length < 10 || value.length > 15)) {
          setErrorMessage('Length from 10 to 15 characters');
          return;
        }

        if (value) {
          setErrorMessage('Phone is invalid');
          return;
        }

        setErrorMessage('Phone cannot be empty');
      },
    };
  }

  if (controlName === Controls.Password) {
    return {
      ...controlData,
      isValid: REG_EXP_VALIDATE_PASSWORD.test(value),
      isInvalid: !REG_EXP_VALIDATE_PASSWORD.test(value),
      successMessage: 'Password is correct',
      setValue: (value: string) => {
        setIsDirty(true);
        setValue(value);

        if (value && (value.length < 8 || value.length > 40)) {
          setErrorMessage('Length from 8 to 40 characters');
          return;
        }

        if (value) {
          setErrorMessage('Need number and capital letter');
          return;
        }

        setErrorMessage('Password cannot be empty');
      },
    };
  }

  return {
    ...controlData,
    isValid: REG_EXP_VALIDATE_PASSWORD.test(value),
    isInvalid: !REG_EXP_VALIDATE_PASSWORD.test(value),
    successMessage: 'Password matches',
    setValue: (value: string) => {
      setIsDirty(true);
      setValue(value);
    },
  };
}
