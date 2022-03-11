import { Point } from '../implementation/Point';

export interface ICollidableEntity {
  isCollided: (other: ICollidableEntity) => boolean;
  onCollide: () => void;
  geCollisionPoints: () => Point[];
}
