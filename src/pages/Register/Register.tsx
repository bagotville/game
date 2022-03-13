import React, { useState } from 'react';
import Console from '../../components/Console/Console';
import { ConsoleStrategy } from '../../components/ConsoleStrategy/ConsoleStrategy';
import { registerTabs } from './Register.constants';
import { RegisterPageMessages } from './Register.types';
import { validate } from './Register.utils';
import { TStringOnlyValues } from '../../components/ConsoleStrategy/ConsoleStrategy.types';
import { ISignupForm } from '../../types/api/auth';
import { useSignUp } from '../../api';

export function RegisterPage(props: RegisterPageMessages) {
  const { messages, isAuthRefetch } = props;

  const signUp = useSignUp();
  const [error, setError] = useState(messages);

  const tryRegister = (result: ISignupForm & TStringOnlyValues) => {
    const validationResult = validate(result);

    if (validationResult.length === 0) {
      signUp.mutateAsync(result).then(() => isAuthRefetch());
    } else {
      setError([
        {
          message: validationResult.join(';'),
          outputClassName: 'error',
        },
        ...messages,
      ]);
    }
  };

  return (
    <Console header="register" tabs={registerTabs} height="70%">
      <ConsoleStrategy messages={error} onSuccessHookHandler={tryRegister} />
    </Console>
  );
}
