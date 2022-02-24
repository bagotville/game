import { MouseEventHandler } from 'react';

export interface IPropsButton {
  name: string;
  disabled?: boolean;
  type?: 'confirm' | 'cancel';
  onCLick?: MouseEventHandler<HTMLButtonElement>;
}
