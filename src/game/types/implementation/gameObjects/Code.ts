import { ICollidableEntity } from '../../base/ICollidableEntity';
import { Point } from '../Point';
import { Rectangle } from '../Rectangle';
import { Size } from '../Size';
import { Speed } from '../Speed';
import { CODE_SAMPLE } from './codeSamplesConstant';
import { CANVAS_FONT, CANVAS_FONT_SIZE } from './gameObjectsConstants';

export class Code implements ICollidableEntity {
  globalCoordinates: Point;

  size: Size;

  id: number;

  code: string;

  collisionRectangle: Rectangle;

  constructor(id: number, coordinates: Point, size: Size) {
    this.id = id;
    this.globalCoordinates = coordinates;
    this.size = size;
    this.code = this.getRandomCode(this.size.x / (CANVAS_FONT_SIZE / 3));
    this.collisionRectangle = new Rectangle(coordinates, this.size);
  }

  getRandomCode(len: number) {
    const codeSample = CODE_SAMPLE.replace('\n', '').replace('\t', '').replace(/\s/g, '').replace('\r\n', '');

    const start = Math.random() * codeSample.length - len;
    const end = start + len;
    return codeSample.slice(start, end);
  }

  isCollided: (other: ICollidableEntity) => boolean = (other) =>
    other.getCollisionRectangles().some((rect) => this.collisionRectangle.isColidedWith(rect));

  onCollide: (other: ICollidableEntity) => void = () => {};

  getCollisionRectangles: () => Rectangle[] = () => [this.collisionRectangle];

  refresh() {}

  speed: Speed = { x: 0, y: 0 };

  render(canvas: CanvasRenderingContext2D, viewport: Rectangle) {
    const realX = this.globalCoordinates.x - viewport.coordinates.x + viewport.size.x / 2;
    const realY = this.globalCoordinates.y - viewport.coordinates.y + viewport.size.y / 2 + CANVAS_FONT_SIZE;

    canvas.fillStyle = 'white';
    canvas.font = CANVAS_FONT;
    canvas.fillText(this.code, realX, realY, this.size.x);
  }
}
