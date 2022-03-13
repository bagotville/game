import { ICollidableEntity } from '../../base/ICollidableEntity';
import { Point } from '../Point';
import { Rectangle } from '../Rectangle';
import { Size } from '../Size';
import { Speed } from '../Speed';
import { CODE_HEIGHT, CODE_WIDTH } from './gameObjectsConstants';

export class Code implements ICollidableEntity {
  coordinates: Point;

  size: Size;

  id: number;

  code: string;

  collisionRectangle: Rectangle;

  constructor(id: number, coordinates: Point, code: string) {
    this.id = id;
    this.coordinates = coordinates;
    this.code = code;
    this.calculateSize();
    this.collisionRectangle = new Rectangle(coordinates, this.size);
  }

  isCollided: (other: ICollidableEntity) => boolean = (other) =>
    other
      .getCollisionRectangles()
      .some((rect) => this.collisionRectangle.isColidedWith(rect));

  onCollide: () => void;

  getCollisionRectangles: () => Rectangle[] = () => [this.collisionRectangle];

  move() {}

  speed: Speed = { x: 0, y: 0 };

  private calculateSize() {
    this.size = {
      x: this.code.length * CODE_WIDTH,
      y: CODE_HEIGHT,
    };
  }

  render(canvas: CanvasRenderingContext2D) {
    canvas.fillStyle = 'black';
    canvas.fillRect(
      this.coordinates.x,
      this.coordinates.y,
      this.size.x,
      this.size.y,
    );
  }
}
