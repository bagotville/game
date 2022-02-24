import {
  REG_EXP_VALIDATE_EMAIL,
  REG_EXP_VALIDATE_LOGIN,
  REG_EXP_VALIDATE_NAME,
  REG_EXP_VALIDATE_PASSWORD,
  REG_EXP_VALIDATE_PHONE,
} from '../index';
import { IValidationErrors, TValidatorFn } from './validator.types';

export class Validator {
  static required(fieldName: string = 'Field'): TValidatorFn {
    return (value: string) =>
      value ? null : { required: `${fieldName} is required` };
  }

  static minLength(minLength: number): TValidatorFn {
    return (value: string) =>
      value.length < minLength
        ? { minLength: `Minimum length ${minLength} characters` }
        : null;
  }

  static maxLength(maxLength: number): TValidatorFn {
    return (value: string) =>
      value.length > maxLength
        ? { minLength: `Maximum length ${maxLength} characters` }
        : null;
  }

  static email(value: string): IValidationErrors | null {
    return REG_EXP_VALIDATE_EMAIL.test(value)
      ? null
      : { email: 'Email is invalid' };
  }

  static login(value: string): IValidationErrors | null {
    return REG_EXP_VALIDATE_LOGIN.test(value)
      ? null
      : { login: 'Only Latin letters and numbers' };
  }

  static userName(value: string): IValidationErrors | null {
    return REG_EXP_VALIDATE_NAME.test(value)
      ? null
      : { userName: 'Only latin and cyrillic letters' };
  }

  static phone(value: string): IValidationErrors | null {
    return REG_EXP_VALIDATE_PHONE.test(value)
      ? null
      : { phone: 'Phone is invalid' };
  }

  static password(value: string): IValidationErrors | null {
    return REG_EXP_VALIDATE_PASSWORD.test(value)
      ? null
      : { password: 'Need number and capital letter' };
  }

  static passwordRepeat(repeatablePassword: string): TValidatorFn {
    return (value: string) =>
      value === repeatablePassword
        ? null
        : { passwordRepeat: 'Passwords do not match' };
  }
}
