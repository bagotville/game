import React from 'react';
import { useSelector } from 'react-redux';
import { ISignupForm } from '../../../api/auth/auth.types';
import Console from '../../../components/Console/Console';
import { ConsoleStrategy } from '../../../components/ConsoleStrategy/ConsoleStrategy';
import { GuardRoute } from '../../../components/GuardRoute';
import authController from '../../../controllers/authController';
import { ROUTES } from '../../../services/constants';
import { useAppDispatch } from '../../../store/store.hooks';
import { error, getAuthErrors, isAuth } from '../auth.reducer';
import { registerTabs } from './Register.constants';
import { RegisterPageMessages, RegisterProps } from './Register.types';
import { validate } from './Register.utils';

export function RegisterPage(props: RegisterPageMessages) {
  const dispatch = useAppDispatch();
  const errors = useSelector(getAuthErrors);
  const isAuthenticated = useSelector(isAuth);
  const { messages } = props;

  let actualMessages = messages;
  if (errors) {
    actualMessages = [
      {
        message: errors,
        outputClassName: 'error',
      },
      ...messages,
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
