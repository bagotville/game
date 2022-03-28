import { InputTypes } from '../../components/Input/Input.types';

export interface IPropsProfile {
  className?: string;
}

export interface IProfileInput<T> {
  id: string;
  type: InputTypes;
  label: string;
  controlName: T;
  className: string;
}
