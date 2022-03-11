import { ICollidableEntity } from '../../base/ICollidableEntity';
import { IRenderableEntity } from '../../base/IRenderableEntity';
import { Point } from '../Point';
import { Size } from '../Size';
import { Speed } from '../Speed';
import { Code } from './Code';

export class Level implements IRenderableEntity, ICollidableEntity {
  coordinates: Point;

  size: Size;

  id: number;

  levelData: string;

  visualElements: IRenderableEntity[];

  constructor(id: number, levelData: string) {
    this.id = id;
    this.levelData = levelData;
    this.size = this.calculateSize();
    this.coordinates = { x: 0, y: 0 };
    this.visualElements = [];
    this.generateLevel();
  }

  move() {}

  speed: Speed = { x: 0, y: 0 };

  generateLevel() {
    // TODO доработать генерацию уровня
    const level = new Code(0, { x: 0, y: 100 }, this.levelData);
    this.visualElements.push(level);
  }

  geCollisionPoints: () => Point[] = () => {
    // TODO доработать отдачу всех точек столкновения для уровня
    const result: Point[] = [];

    return result;
  };

  private calculateSize(): Size {
    return {
      x: 500,
      y: 500,
    };
  }

  isCollided: (other: ICollidableEntity) => boolean;

  onCollide: () => void;

  render(canvas: CanvasRenderingContext2D) {
    this.visualElements.forEach((element) => element.render(canvas));
  }
}
