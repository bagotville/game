import { Point } from '../implementation/Point';
import { Size } from '../implementation/Size';
import { Speed } from '../implementation/Speed';
import { IBaseEntity } from './IBaseEntity';

export interface IRenderableEntity extends IBaseEntity {
  render: (canvas: CanvasRenderingContext2D) => void;
  move: () => void;
  coordinates: Point;
  size: Size;
  speed: Speed;
}
