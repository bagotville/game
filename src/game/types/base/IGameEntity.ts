import { Point } from '../implementation/Point';
import { Size } from '../implementation/Size';
import { Speed } from '../implementation/Speed';
import { IBaseEntity } from './IBaseEntity';

export interface IGameEntity extends IBaseEntity {
  globalCoordinates: Point;
  size: Size;
  speed: Speed;
  refresh: () => void;
}
