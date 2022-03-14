import { InputTypes } from '../Input/Input.types';

export interface IConsoleStrategyProps<T extends TStringOnlyValues> {
  messages: IMessage<T>[];
  onSuccessHookHandler: (result: T) => void;
}

export interface IMessage<T extends TStringOnlyValues> {
  message: string;
  delay?: number;
  mapToField?: keyof T;
  inputType?: InputTypes;
  outputClassName?: string;
}

export type TStringOnlyValues = {
  [key: string]: string;
};
