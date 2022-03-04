/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable spaced-comment */
import React from 'react';
import { useSelector } from 'react-redux';
import { ISignupForm } from '../../../api/auth/auth.types';
import Console from '../../../components/Console/Console';
import { ConsoleStrategy } from '../../../components/ConsoleStrategy/ConsoleStrategy';
import { StringOnlyValues } from '../../../components/ConsoleStrategy/ConsoleStrategy.types';
import { GuardRoute } from '../../../components/GuardRoute';
import authController from '../../../controllers/authController';
import {
  REG_EXP_VALIDATE_EMAIL,
  REG_EXP_VALIDATE_LOGIN,
  REG_EXP_VALIDATE_NAME,
  REG_EXP_VALIDATE_PASSWORD,
  REG_EXP_VALIDATE_PHONE,
  ROUTES,
} from '../../../services/constants';
import { useAppDispatch } from '../../../store/store.hooks';
import { error, getAuthErrors, isAuth } from '../auth.reducer';
import { defaultRegisterProps, registerTabs } from './Register.constants';

export function RegisterPage() {
  const registerProps = defaultRegisterProps;
  const dispatch = useAppDispatch();
  const errors = useSelector(getAuthErrors);
  const isAuthenticated = useSelector(isAuth);

  let actualMessages = [...registerProps.messages];
  if (errors) {
    actualMessages = [
      {
        message: errors,
        outputClassName: 'error',
      },
      ...registerProps.messages,
    ];
  }

  const tryRegister = (result: RegisterProps) => {
    const validationResult = validate(result);
    if (validationResult.length === 0) {
      const signupData = result as ISignupForm;
      authController.signUp(signupData, dispatch);
    } else {
      dispatch(error(validationResult.join(';')));
    }
  };

  function validate(result: ISignupForm) {
    const errorMessage = [];
    if (
      !REG_EXP_VALIDATE_NAME.test(result.first_name) ||
      !REG_EXP_VALIDATE_NAME.test(result.second_name)
    ) {
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
      errorMessage.push(
        'password doesnt match repeat password',
        result.password,
        result.repeatPassword,
      );
    }

    if (!REG_EXP_VALIDATE_PASSWORD.test(result.password)) {
      errorMessage.push('password typed wrong');
    }

    return errorMessage;
  }

  return (
    <GuardRoute redirectTo={ROUTES.home} canActivate={!isAuthenticated}>
      <Console header="register" tabs={registerTabs} height="70%">
        <ConsoleStrategy
          messages={actualMessages}
          onSuccessHookHandler={tryRegister}
        />
      </Console>
    </GuardRoute>
  );
}

interface RegisterProps extends StringOnlyValues {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  repeat_password: string;
}
