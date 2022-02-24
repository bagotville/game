import { useEffect, useState } from 'react';
import { TValidatorFn } from '../../validatior/validator.types';
import { useValidateControl } from '../useValidate';
import { IControlInfo } from '../useValidate/types';

interface IControls {
  [key: string]: [string, TValidatorFn[]];
}

export function useValidateForm(controls: IControls) {
  const [isValid, setIsValid] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const form = Object.entries(controls).reduce(
    (acc: { [key: string]: IControlInfo }, [key, value]) => {
      acc[key] = useValidateControl(value[0], value[1]);
      return acc;
    },
    {},
  );

  const valueDeps = Object.values(form).map((i) => i.value);
  const isValidDeps = Object.values(form).map((i) => i.isValid);

  useEffect(() => {
    Object.values(form).map((i) => i.update());

    setIsValid(Object.values(form).every((i) => i.isValid === true));
    setIsInvalid(Object.values(form).some((i) => i.isInvalid === true));
    setIsDirty(Object.values(form).some((i) => i.isDirty === true));
  }, [...valueDeps, ...isValidDeps]);

  return {
    isValid,
    isInvalid,
    isDirty,
    controls: form,
  };
}
