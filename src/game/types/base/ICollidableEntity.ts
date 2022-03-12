import { Rectangle } from '../implementation/Rectangle';
import { IRenderableEntity } from './IRenderableEntity';

export interface ICollidableEntity extends IRenderableEntity {
  isCollided: (other: ICollidableEntity) => boolean;
  onCollide: (other: ICollidableEntity) => void;
  getCollisionRectangles: () => Rectangle[];
}
