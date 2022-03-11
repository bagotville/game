import { Point } from './Point';
import { Size } from './Size';

export class Rectangle {
  coordinates: Point;

  size: Size;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public isColidedWith(other: Rectangle) {
    // TODO реализовать алгоритм столкновений!
    return false;
  }
}
