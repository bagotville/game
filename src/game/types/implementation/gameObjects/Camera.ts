import { IGameEntity } from '../../base/IGameEntity';
import { Point } from '../Point';
import { Rectangle } from '../Rectangle';
import { Size } from '../Size';
import { Speed } from '../Speed';

export class Camera implements IGameEntity {
  globalCoordinates: Point;

  size: Size;

  speed: Speed;

  followObject: IGameEntity;

  id: number;

  constructor(id: number, coordinates: Point, size: Size, speed: Speed) {
    this.globalCoordinates = coordinates;
    this.size = size;
    this.speed = speed;
    this.id = id;
  }

  getViewportRectangle(): Rectangle {
    return new Rectangle(this.globalCoordinates, this.size);
  }

  refresh() {
    if (!this.followObject) {
      return;
    }
    const vector: Point = {
      x: this.followObject.globalCoordinates.x,
      y: this.followObject.globalCoordinates.y,
    };
    vector.x -= this.globalCoordinates.x;
    vector.y -= this.globalCoordinates.y;

    this.speed.x += (vector.x - this.speed.x) / 2;
    this.speed.y += (vector.y - this.speed.y) / 2;
    this.move();
  }

  move() {
    this.globalCoordinates.x += this.speed.x;
    this.globalCoordinates.y += this.speed.y;
  }

  follow(object: IGameEntity) {
    this.followObject = object;
  }
}
