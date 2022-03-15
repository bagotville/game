import { MouseEventHandler } from 'react';

export interface IPropsButton {
  name: string;
  disabled?: boolean;
  color?: 'blue' | 'pink' | 'yellow';
  onCLick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}
