import { ICollidableEntity } from '../../base/ICollidableEntity';
import { Point } from '../Point';
import { Rectangle } from '../Rectangle';
import { Size } from '../Size';
import { Speed } from '../Speed';
import { Code } from './Code';

export class Level implements ICollidableEntity {
  coordinates: Point;

  size: Size;

  id: number;

  levelData: string;

  visualElements: ICollidableEntity[];

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
    const code1 = new Code(0, { x: 0, y: 300 }, this.levelData);
    const code2 = new Code(0, { x: 50, y: 250 }, 'another block');
    this.visualElements.push(code1);
    this.visualElements.push(code2);
  }

  getCollisionRectangles: () => Rectangle[] = () =>
    this.visualElements.flatMap((elem) => elem.getCollisionRectangles());

  private calculateSize(): Size {
    return {
      x: 500,
      y: 500,
    };
  }

  isCollided(other: ICollidableEntity) {
    return this.visualElements.some((elem) => elem.isCollided(other));
  }

  onCollide: (other: ICollidableEntity) => void = () => {};

  render(canvas: CanvasRenderingContext2D) {
    this.visualElements.forEach((element) => element.render(canvas));
  }
}
