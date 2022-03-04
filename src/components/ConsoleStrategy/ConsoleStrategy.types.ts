/* eslint-disable no-unused-vars */
export interface IConsoleStrategyProps<T extends StringOnlyValues> {
  messages: IMessage<T>[];
  onSuccessHookHandler: (result: T) => void;
}

export interface IMessage<T extends StringOnlyValues> {
  message: string;
  delay?: number;
  mapToField?: keyof T;
  inputType?: InputType;
  outputClassName?: string;
}

export type InputType = 'text' | 'password' | 'email';

export type StringOnlyValues = {
  [key: string]: string;
};
