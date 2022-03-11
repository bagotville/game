import { IRenderableEntity } from '../../base/IRenderableEntity';
import { Point } from '../Point';
import { Size } from '../Size';
import { Speed } from '../Speed';
import { CODE_HEIGHT, CODE_WIDTH } from './gameObjectsConstants';

export class Code implements IRenderableEntity {
  coordinates: Point;

  size: Size;

  id: number;

  code: string;

  constructor(id: number, coordinates: Point, code: string) {
    this.id = id;
    this.coordinates = coordinates;
    this.code = code;
    this.calculateSize();
  }

  move() {}

  speed: Speed = { x: 0, y: 0 };

  private calculateSize() {
    // Здесь автоматом должен вычислиться размер карты исходя из кол-ва символов
    this.size = {
      x: CODE_WIDTH,
      y: CODE_HEIGHT,
    };
  }

  render(canvas: CanvasRenderingContext2D) {
    canvas.font = '36px consolas';
    canvas.fillStyle = 'black';
    canvas.fillText(this.code, this.coordinates.x, this.coordinates.y);
  }
}
