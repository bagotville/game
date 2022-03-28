import { IControlInfo } from '../../services/hooks/useValidateControl/useValidateContol.types';
import { ControlsData, ControlsPass } from '../../types/api/user';

export function getErrorMessage(control: IControlInfo, controlName: ControlsData | ControlsPass): string {
  const { errors } = control;

  if (controlName === ControlsData.Login) {
    return errors.required || errors.minLength || errors.maxLength || errors.login;
  }
  if (controlName === ControlsData.DisplayName) {
    return errors.required || errors.minLength || errors.maxLength || errors.login;
  }
  if (controlName === ControlsData.FirstName) {
    return errors.required || errors.userName;
  }
  if (controlName === ControlsData.SecondName) {
    return errors.required || errors.userName;
  }
  if (controlName === ControlsData.Email) {
    return errors.required || errors.email;
  }
  if (controlName === ControlsData.Phone) {
    return errors.required || errors.minLength || errors.maxLength || errors.phone;
  }
  if (controlName === ControlsPass.NewPassword) {
    return errors.required || errors.minLength || errors.maxLength || errors.password;
  }
  if (controlName === ControlsPass.OldPassword) {
    return errors.required || errors.minLength || errors.maxLength || errors.password;
  }
  return errors.passwordRepeat;
}
