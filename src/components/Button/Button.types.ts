import { MouseEventHandler } from 'react';

export interface IPropsButton {
  name: string;
  disabled?: boolean;
  color?: 'blue' | 'pink' | 'yellow';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
