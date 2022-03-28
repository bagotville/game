import { useEffect, useState } from 'react';
import { useValidateControl } from '../useValidateControl';
import { IControlInfo } from '../useValidateControl/useValidateContol.types';
import { IControls, IFormInfo } from './useValidateForm.types';

export function useValidateForm<T extends object>(controls: IControls): IFormInfo<T> {
  const [isValid, setIsValid] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  // @ts-ignore
  const [value, setValue] = useState<T>({});

  const form = Object.entries(controls).reduce((acc: { [key: string]: IControlInfo }, [key, value]) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    acc[key] = useValidateControl(value[0] || '', value[1]);
    return acc;
  }, {});

  const valueDeps = Object.values(form).map((i) => i.value);
  const isValidDeps = Object.values(form).map((i) => i.isValid);

  useEffect(() => {
    Object.values(form).map((i) => i.update());

    setIsValid(Object.values(form).every((i) => i.isValid === true));
    setIsInvalid(Object.values(form).some((i) => i.isInvalid === true));
    setIsDirty(Object.values(form).some((i) => i.isDirty === true));
    setValue(
      Object.entries(form).reduce((acc, [key, value]) => {
        // @ts-ignore
        acc[key] = value.value;

        return acc;
      }, {} as T),
    );
  }, [...valueDeps, ...isValidDeps]);

  return {
    isValid,
    isInvalid,
    isDirty,
    value,
    controls: form,
  };
}
