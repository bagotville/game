import { IInteractiveEntity } from '../../base/IInteractiveEntity';
import { IRenderableEntity } from '../../base/IRenderableEntity';
import { Point } from '../Point';
import { Size } from '../Size';
import { Speed } from '../Speed';
import {
  KEYS,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  PLAYER_X_SPEED,
} from './gameObjectsConstants';

export class Player implements IRenderableEntity, IInteractiveEntity {
  coordinates: Point;

  size: Size;

  id: number;

  public constructor(id: number, coordinates: Point) {
    this.id = id;
    this.size = {
      x: PLAYER_WIDTH,
      y: PLAYER_HEIGHT,
    };
    this.coordinates = coordinates;
    this.speed = { x: 0, y: 0 };
  }

  speed: Speed;

  render(canvas: CanvasRenderingContext2D) {
    canvas.fillStyle = 'green';
    canvas.fillRect(
      this.coordinates.x,
      this.coordinates.y,
      this.size.x,
      this.size.y,
    );
  }

  onKeyDown(keyEvent: KeyboardEvent) {
    if (keyEvent.key === KEYS.ARROW_LEFT) {
      this.speed.x = -PLAYER_X_SPEED;
    } else if (keyEvent.key === KEYS.ARROW_RIGHT) {
      this.speed.x = PLAYER_X_SPEED;
    }
  }

  onKeyUp(keyEvent: KeyboardEvent) {
    if (keyEvent.key === KEYS.ARROW_LEFT || keyEvent.key === KEYS.ARROW_RIGHT) {
      this.speed.x = 0;
    }
  }

  move() {
    this.coordinates.x += this.speed.x;
    this.coordinates.y += this.speed.y;
  }
}
