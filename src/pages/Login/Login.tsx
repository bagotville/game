import React, { useState } from 'react';
import Console from '../../components/Console/Console';
import { ConsoleStrategy } from '../../components/ConsoleStrategy/ConsoleStrategy';
import { TStringOnlyValues } from '../../components/ConsoleStrategy/ConsoleStrategy.types';
import { loginTabs } from './Login.constants';
import { LoginMessages } from './Login.types';
import { useSignIn } from '../../api/hooks/useSignIn';

export function LoginPage(props: LoginMessages) {
  const { messages, refetch } = props;

  const signIn = useSignIn();
  const [error, setError] = useState(messages);

  const tryLogin = (result: TStringOnlyValues) => {
    if (isValid(result)) {
      signIn
        .mutateAsync({
          login: result.login,
          password: result.password,
        })
        .then(() => {
          refetch();
        })
        .catch((e) => {
          setError([
            {
              message: e.response.data.reason,
              outputClassName: 'error',
            },
            ...messages,
          ]);
        });
    }
  };

  function isValid(result: TStringOnlyValues) {
    return !(!result.login || result.login.length < 3 || result.login.length > 20);
  }

  return (
    <Console header="login" tabs={loginTabs}>
      <ConsoleStrategy messages={error} onSuccessHookHandler={tryLogin} />
    </Console>
  );
}
