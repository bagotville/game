import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Console from '../../components/Console/Console';
import { ConsoleStrategy } from '../../components/ConsoleStrategy/ConsoleStrategy';
import { TStringOnlyValues } from '../../components/ConsoleStrategy/ConsoleStrategy.types';
import { loginTabs } from './Login.constants';
import { LoginMessages } from './Login.types';
import { useSignIn } from '../../api';
import { Button } from '../../components/Button';
import { serviceId } from '../../store/reducers/auth';
import styles from './Login.scss';
import { OAUTH_URL } from '../../services';

function isValid(result: TStringOnlyValues) {
  return !(!result.login || result.login.length < 3 || result.login.length > 20);
}

export function Login(props: LoginMessages) {
  const { messages, isAuthRefetch } = props;

  const cServiceId = useSelector(serviceId);

  const signIn = useSignIn();
  const [error, setError] = useState(messages);

  const tryLogin = (result: TStringOnlyValues) => {
    if (isValid(result)) {
      signIn
        .mutateAsync({
          login: result.login,
          password: result.password,
        })
        .then(() => isAuthRefetch())
        .catch((e) =>
          setError([
            {
              message: e.response.data.reason,
              outputClassName: 'error',
            },
            ...messages,
          ]),
        );
    }
  };

  const oAuthHandler = () => {
    window.open(`${OAUTH_URL}?response_type=code&client_id=${cServiceId}&redirect_uri=${document.location.origin}`);
  };

  return (
    <>
      <Console header="login" tabs={loginTabs}>
        <ConsoleStrategy messages={error} onSuccessHookHandler={tryLogin} />
      </Console>
      <Button className={styles.oauth} name="Sign in with Yandex" color="yellow" onClick={oAuthHandler} />
    </>
  );
}
