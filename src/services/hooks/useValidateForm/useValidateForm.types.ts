import { IControlInfo } from '../useValidateControl/useValidateContol.types';

export interface IFormInfo {
  isValid: boolean;
  isInvalid: boolean;
  /**
   * isDirty flag if any control has been changed
   */
  isDirty: boolean;
  controls: { [key: string]: IControlInfo };
}
