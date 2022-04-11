import { Rectangle } from '../implementation/Rectangle';
import { IGameEntity } from './IGameEntity';

export interface IRenderableEntity extends IGameEntity {
  render: (canvas: CanvasRenderingContext2D, viewport: Rectangle) => void;
}
