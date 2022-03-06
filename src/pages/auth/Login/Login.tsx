import React from 'react';
import { useSelector } from 'react-redux';
import Console from '../../../components/Console/Console';
import { ConsoleStrategy } from '../../../components/ConsoleStrategy/ConsoleStrategy';
import { StringOnlyValues } from '../../../components/ConsoleStrategy/ConsoleStrategy.types';
import { GuardRoute } from '../../../components/GuardRoute';
import authController from '../../../controllers/authController';
import { ROUTES } from '../../../services/constants';
import { useAppDispatch } from '../../../store/store.hooks';
import { getAuthErrors, isAuth } from '../auth.reducer';
import { loginTabs } from './Login.constants';
import { LoginMessages } from './Login.types';

export function LoginPage(props: LoginMessages) {
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

  const tryLogin = (result: StringOnlyValues) => {
    if (isValid(result)) {
      authController.signIn(result.login, result.password, dispatch);
    }
  };

  function isValid(result: StringOnlyValues) {
    if (!result.login || result.login.length < 3 || result.login.length > 20) {
      return false;
    }
    return true;
  }

  return (
    <GuardRoute redirectTo={ROUTES.home} canActivate={!isAuthenticated}>
      <Console header="login" tabs={loginTabs}>
        <ConsoleStrategy
          messages={actualMessages}
          onSuccessHookHandler={tryLogin}
        />
      </Console>
    </GuardRoute>
  );
}
