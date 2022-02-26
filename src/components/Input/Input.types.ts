import { FormEvent } from 'react';

export enum InputTypes {
  Text = 'text',
  Email = 'email',
  Password = 'password',
}

export interface IInputProps {
  id: string;
  value: string;
  label: string;
  type: InputTypes;
  autoComplete?: 'on' | 'off';
  isValid?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  successMessage?: string;
  disabled?: boolean;
  className?: string;
  onInput?: (event: FormEvent<HTMLInputElement>) => void;
}
