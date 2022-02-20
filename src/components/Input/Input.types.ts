import { FormEvent } from 'react';

export interface IInputProps {
  id: string;
  value: string;
  label: string;
  isValid?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  successMessage?: string;
  disabled?: boolean;
  className?: string;
  onInput?: (event: FormEvent<HTMLInputElement>) => void;
}
