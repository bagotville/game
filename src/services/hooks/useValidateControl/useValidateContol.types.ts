import { IValidationErrors } from '../../validatior/validator.types';

export interface IControlInfo {
  value: string;
  isValid: boolean;
  isInvalid: boolean;
  /**
   *. isDirty flag if the input has been changed
   * */
  isDirty: boolean;
  errors: IValidationErrors;
  setValue: (value: string) => void;
  update: () => void;
}
