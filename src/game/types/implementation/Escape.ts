import { Code } from './gameObjects/Code';
import { CANVAS_FONT, CANVAS_FONT_SIZE } from './gameObjects/gameObjectsConstants';
import { Rectangle } from './Rectangle';
import { ICollidableEntity } from '../base/ICollidableEntity';
import { Player } from './gameObjects/Player';

export class Escape extends Code {
  private gameEndEventCallback: () => void;

  override render(canvas: CanvasRenderingContext2D, viewport: Rectangle) {
    const realX = this.globalCoordinates.x - viewport.coordinates.x + viewport.size.x / 2;
    const realY = this.globalCoordinates.y - viewport.coordinates.y + viewport.size.y / 2 + CANVAS_FONT_SIZE;

    canvas.fillStyle = 'red';
    canvas.font = CANVAS_FONT;
    canvas.fillText(this.code, realX, realY, this.size.x);
  }

  public subscribeForGameEndEvent(callback: () => void) {
    this.gameEndEventCallback = callback;
  }

  onCollide: (other: ICollidableEntity) => void = (other) => {
    if ((other as Player).isPlayer) {
      this.gameEndEventCallback();
    }
  };
}
