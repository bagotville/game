import { ISignupForm } from '../../api/auth';
import {
  REG_EXP_VALIDATE_EMAIL,
  REG_EXP_VALIDATE_LOGIN,
  REG_EXP_VALIDATE_NAME,
  REG_EXP_VALIDATE_PASSWORD,
  REG_EXP_VALIDATE_PHONE,
} from '../../services';

export function validate(result: ISignupForm) {
  const errorMessage = [];
  if (!REG_EXP_VALIDATE_NAME.test(result.first_name) || !REG_EXP_VALIDATE_NAME.test(result.second_name)) {
    errorMessage.push('first name or second name is typed wrong;');
  }

  if (!REG_EXP_VALIDATE_LOGIN.test(result.login)) {
    errorMessage.push('login typed wrong');
  }

  if (!REG_EXP_VALIDATE_EMAIL.test(result.email)) {
    errorMessage.push('email typed wrong');
  }

  if (!REG_EXP_VALIDATE_PHONE.test(result.phone)) {
    errorMessage.push('phone typed wrong');
  }

  if (result.password !== result.repeatPassword) {
    errorMessage.push('password doesnt match repeat password', result.password, result.repeatPassword);
  }

  if (!REG_EXP_VALIDATE_PASSWORD.test(result.password)) {
    errorMessage.push('password typed wrong');
  }

  return errorMessage;
}
