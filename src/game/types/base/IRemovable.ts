import { IEventEmitters } from './IEventEmmiters';

export interface IRemovable extends IEventEmitters {
  die: () => void;
}
