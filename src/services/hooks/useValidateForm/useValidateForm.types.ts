import { IControlInfo } from '../useValidateControl/useValidateContol.types';
import { TValidatorFn } from '../../validatior/validator.types';

export interface IFormInfo<T> {
  isValid: boolean;
  isInvalid: boolean;
  /**
   * isDirty flag if any control has been changed
   */
  isDirty: boolean;
  value: T;
  controls: { [key: string]: IControlInfo };
}

export interface IControls {
  [key: string]: [string | undefined, TValidatorFn[]];
}
