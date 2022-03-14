import { ICollidableEntity } from '../base/ICollidableEntity';
import { IInteractiveEntity } from '../base/IInteractiveEntity';
import {
  COLLISION_LAG,
  GRAVITY_POWER,
  KEYS,
  MAX_GRAVITY_POWER,
  PLAYER_X_SPEED,
  PLAYER_Y_SPEED as PLAYER_JUMP_SPEED,
  VECTOR_KEYS,
} from './gameObjects/gameObjectsConstants';
import { Point } from './Point';
import { Rectangle } from './Rectangle';
import { Size } from './Size';
import { Speed } from './Speed';
import { Vector } from './Vector';

export abstract class InteractiveCharacter
  implements IInteractiveEntity, ICollidableEntity
{
  constructor(id: number, coordinates: Point, size: Size) {
    this.id = id;
    this.globalCoordinates = coordinates;
    this.size = size;
    this.collideRectangle = new Rectangle(coordinates, size);
    this.vectors = [];
    this.speed = { x: 0, y: 0 };
    this.isOnTheGround = false;
    this.isLeftBlocked = false;
    this.isRightBlocked = false;
  }

  isOnTheGround: boolean;

  isLeftBlocked: boolean;

  isRightBlocked: boolean;

  groundRectangle: Rectangle | null;

  collideRectangle: Rectangle;

  moveCollideRectangle = () => {
    this.collideRectangle.coordinates.x = this.globalCoordinates.x;
    this.collideRectangle.coordinates.y = this.globalCoordinates.y;
  };

  isCollided: (other: ICollidableEntity) => boolean = (other) =>
    other
      .getCollisionRectangles()
      .some((rect) => rect.isColidedWith(this.collideRectangle));

  onCollide: (other: ICollidableEntity) => void = (other) => {
    other.getCollisionRectangles().forEach((rect) => {
      if (rect.isColidedWith(this.collideRectangle)) {
        this.onCollideWithOtherRect(rect);
      }
    });
  };

  onCollideWithOtherRect: (other: Rectangle) => void = (other) => {
    this.checkCollisionLeft(other);
    this.checkCollisionRight(other);
    this.checkCollisionBottom(other);
    this.checkCollisionTop(other);
  };

  private checkCollisionRight(other: Rectangle) {
    if (Rectangle.isCollidedRight(this.collideRectangle, other)) {
      this.speed.x = 0;
      this.globalCoordinates.x =
        other.coordinates.x - this.size.x - COLLISION_LAG;
      this.isRightBlocked = true;
    } else {
      this.isRightBlocked = false;
    }
  }

  private checkCollisionLeft(other: Rectangle) {
    if (Rectangle.isCollidedLeft(this.collideRectangle, other)) {
      this.speed.x = 0;
      this.globalCoordinates.x =
        other.coordinates.x + other.size.x + COLLISION_LAG;
      this.isLeftBlocked = true;
    } else {
      this.isLeftBlocked = false;
    }
  }

  private checkCollisionBottom(other: Rectangle) {
    if (Rectangle.isCollidedBottom(this.collideRectangle, other)) {
      this.speed.y = 0;
      this.isOnTheGround = true;
      this.groundRectangle = other;
      this.globalCoordinates.y = other.coordinates.y - this.size.y;
      this.vectors = this.vectors.filter(
        (vector) => vector.key !== VECTOR_KEYS.JUMP,
      );
    } else if (other === this.groundRectangle) {
      this.isOnTheGround = false;
      this.groundRectangle = null;
    }
    return this.isOnTheGround;
  }

  private checkCollisionTop(other: Rectangle) {
    if (Rectangle.isCollidedTop(this.collideRectangle, other)) {
      this.globalCoordinates.y += COLLISION_LAG;
      this.vectors = this.vectors.filter((vector) => vector.y >= 0);
      this.speed.y = 0;
    }
  }

  getCollisionRectangles: () => Rectangle[] = () => [this.collideRectangle];

  checkIsOnTheGround() {
    if (
      this.isOnTheGround &&
      this.groundRectangle != null &&
      this.checkCollisionBottom(this.groundRectangle)
    ) {
      return true;
    }
    return false;
  }

  render: (canvas: CanvasRenderingContext2D, viewport: Rectangle) => void = (
    canvas,
    viewport,
  ) => {
    const absoluteVector: Vector = { x: 0, y: 0, key: VECTOR_KEYS.UNDEFINED };
    this.vectors.forEach((vector) => {
      absoluteVector.x += vector.x;
      absoluteVector.y += vector.y;
    });
    this.speed.x += (absoluteVector.x - this.speed.x) / 4;
    this.speed.y += absoluteVector.y - this.speed.y;
    if (!this.checkIsOnTheGround()) {
      if (this.speed.y < MAX_GRAVITY_POWER)
        this.vectors.push({ x: 0, y: GRAVITY_POWER, key: VECTOR_KEYS.GRAVITY });
      // this.speed.y += GRAVITY_POWER;
    } else {
      this.vectors = this.vectors.filter(
        (vector) => vector.key !== VECTOR_KEYS.GRAVITY,
      );
    }
    this.draw(canvas, viewport);
  };

  abstract draw: (
    canvas: CanvasRenderingContext2D,
    viewportRectangle: Rectangle,
  ) => void;

  refresh: () => void = () => {
    if (
      (this.speed.x > 0 && !this.isRightBlocked) ||
      (this.speed.x < 0 && !this.isLeftBlocked)
    ) {
      this.globalCoordinates.x += this.speed.x;
    }
    if ((this.speed.y > 0 && !this.isOnTheGround) || this.speed.y < 0) {
      this.globalCoordinates.y += this.speed.y;
    }
    this.moveCollideRectangle();
  };

  globalCoordinates: Point;

  vectors: Vector[];

  size: Size;

  speed: Speed;

  id: number;

  onKeyDown: (keyEvent: KeyboardEvent) => void = (keyEvent) => {
    switch (keyEvent.key) {
      case KEYS.ARROW_LEFT:
        this.moveLeft();
        break;
      case KEYS.ARROW_RIGHT:
        this.moveRight();
        break;
      case KEYS.ARROW_UP:
        this.jump();
        break;
      default:
        break;
    }
  };

  private moveLeft() {
    if (!this.vectors.some((vector) => vector.key === VECTOR_KEYS.MOVE_LEFT)) {
      this.vectors.push({
        x: -PLAYER_X_SPEED,
        y: 0,
        key: VECTOR_KEYS.MOVE_LEFT,
      });
    }
  }

  private stopLeft() {
    this.vectors = this.vectors.filter(
      (vector) => vector.key !== VECTOR_KEYS.MOVE_LEFT,
    );
  }

  private moveRight() {
    if (!this.vectors.some((vector) => vector.key === VECTOR_KEYS.MOVE_RIGHT)) {
      this.vectors.push({
        x: PLAYER_X_SPEED,
        y: 0,
        key: VECTOR_KEYS.MOVE_RIGHT,
      });
    }
  }

  private stopRight() {
    this.vectors = this.vectors.filter(
      (vector) => vector.key !== VECTOR_KEYS.MOVE_RIGHT,
    );
  }

  private jump() {
    if (this.isOnTheGround) {
      this.vectors.push({ x: 0, y: -PLAYER_JUMP_SPEED, key: VECTOR_KEYS.JUMP });
      this.globalCoordinates.y -= COLLISION_LAG * 2;
    }
  }

  onKeyUp: (keyEvent: KeyboardEvent) => void = (keyEvent) => {
    switch (keyEvent.key) {
      case KEYS.ARROW_LEFT:
        this.stopLeft();
        break;
      case KEYS.ARROW_RIGHT:
        this.stopRight();
        break;
      default:
        break;
    }
  };
}
