import { ICollidableEntity } from '../../base/ICollidableEntity';
import { Point } from '../Point';
import { Rectangle } from '../Rectangle';
import { Size } from '../Size';
import { Speed } from '../Speed';
import { CODE_HEIGHT, CODE_WIDTH } from './gameObjectsConstants';

export class Code implements ICollidableEntity {
  globalCoordinates: Point;

  size: Size;

  id: number;

  code: string;

  collisionRectangle: Rectangle;

  constructor(id: number, coordinates: Point, code: string) {
    this.id = id;
    this.globalCoordinates = coordinates;
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

  refresh() {}

  speed: Speed = { x: 0, y: 0 };

  private calculateSize() {
    this.size = {
      x: this.code.length * CODE_WIDTH,
      y: CODE_HEIGHT,
    };
  }

  render(canvas: CanvasRenderingContext2D, viewport: Rectangle) {
    canvas.fillStyle = 'black';
    canvas.fillRect(
      this.globalCoordinates.x - viewport.coordinates.x + viewport.size.x / 2,
      this.globalCoordinates.y - viewport.coordinates.y + viewport.size.y / 2,
      this.size.x,
      this.size.y,
    );
  }
}
