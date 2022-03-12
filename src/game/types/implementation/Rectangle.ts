import { COLLISION_LAG } from './gameObjects/gameObjectsConstants';
import { Point } from './Point';
import { Size } from './Size';

export class Rectangle {
  constructor(coordinates: Point, size: Size) {
    this.coordinates = coordinates;
    this.size = size;
  }

  coordinates: Point;

  size: Size;

  public isColidedWith(other: Rectangle) {
    return (
      Rectangle.isCollided(this, other) || Rectangle.isCollided(other, this)
    );
  }

  public static isCollided(left: Rectangle, right: Rectangle) {
    return (
      this.isCollidedBottom(left, right) ||
      this.isCollidedTop(left, right) ||
      this.isCollidedLeft(left, right) ||
      this.isCollidedRight(left, right)
    );
  }

  public static isCollidedLeft(left: Rectangle, right: Rectangle) {
    return (
      this.isIntersectsVertically(left, right) &&
      Math.abs(
        Math.ceil(right.coordinates.x + right.size.x - left.coordinates.x),
      ) < COLLISION_LAG
    );
  }

  public static isCollidedRight(left: Rectangle, right: Rectangle) {
    return (
      this.isIntersectsVertically(left, right) &&
      Math.abs(
        Math.ceil(right.coordinates.x - (left.coordinates.x + left.size.x)),
      ) < COLLISION_LAG
    );
  }

  public static isCollidedTop(left: Rectangle, right: Rectangle) {
    return (
      this.isIntersectsHorizontally(left, right) &&
      this.isInside(
        left.coordinates.y,
        right.coordinates.y,
        right.coordinates.y + right.size.y,
      )
    );
  }

  public static isCollidedBottom(left: Rectangle, right: Rectangle) {
    return (
      this.isIntersectsHorizontally(left, right) &&
      this.isInside(
        left.coordinates.y + left.size.y,
        right.coordinates.y,
        right.coordinates.y + right.size.y,
      )
    );
  }

  private static isIntersectsHorizontally(left: Rectangle, right: Rectangle) {
    return this.isLinesIntersects(
      left.coordinates.x,
      left.coordinates.x + left.size.x,
      right.coordinates.x,
      right.coordinates.x + right.size.x,
    );
  }

  private static isIntersectsVertically(left: Rectangle, right: Rectangle) {
    return this.isLinesIntersects(
      left.coordinates.y,
      left.coordinates.y + left.size.y,
      right.coordinates.y,
      right.coordinates.y + right.size.y,
    );
  }

  private static isLinesIntersects(
    x1: number,
    x2: number,
    y1: number,
    y2: number,
  ) {
    return (
      this.isOneOfInside(x1, x2, y1, y2) || this.isOneOfInside(y1, y2, x1, x2)
    );
  }

  private static isInside(x1: number, start: number, end: number) {
    return x1 >= start && x1 <= end;
  }

  private static isOneOfInside(
    x1: number,
    x2: number,
    start: number,
    end: number,
  ) {
    return (
      this.isInside(x1, start, end) ||
      this.isInside(x2, start, end) ||
      this.isInside(start, x1, x2) ||
      this.isInside(end, x1, x2)
    );
  }
}
