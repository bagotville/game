import { FormEvent } from 'react';

export interface IInputProps {
  id: string;
  value: string;
  label: string;
  type: 'text' | 'email' | 'password';
  isValid?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  successMessage?: string;
  disabled?: boolean;
  className?: string;
  onInput?: (event: FormEvent<HTMLInputElement>) => void;
}
