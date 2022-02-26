import { useEffect, useState } from 'react';
import { IControlInfo } from './useValidateContol.types';
import {
  IValidationErrors,
  TValidatorFn,
} from '../../validatior/validator.types';

function getErrors(
  value: string,
  validators: TValidatorFn[],
): IValidationErrors {
  return validators.reduce((acc: object, validator: TValidatorFn) => {
    if (validator(value)) {
      Object.assign(acc, validator(value));
    }
    return acc;
  }, {});
}

export function useValidateControl(
  initialValue: string,
  validators: TValidatorFn[],
): IControlInfo {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const update = (value: string) => {
    const errors = getErrors(value, validators);
    const isErrors = !!Object.keys(errors).length;

    setValue(value);
    setErrors(errors);
    setIsInvalid(isErrors);
    setIsValid(!isErrors);
  };

  useEffect(() => {
    update(value);
  }, []);

  return {
    value,
    errors,
    isDirty,
    isValid,
    isInvalid,
    setValue: (value: string) => {
      update(value);
      setIsDirty(true);
    },
    update: () => {
      update(value);
    },
  };
}
