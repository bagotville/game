import { InteractiveCharacter } from '../InteractiveCharacter';
import { Rectangle } from '../Rectangle';

export class Player extends InteractiveCharacter {
  draw: (canvas: CanvasRenderingContext2D, viewport: Rectangle) => void = (
    canvas,
    viewport,
  ) => {
    const realX =
      this.globalCoordinates.x - viewport.coordinates.x + viewport.size.x / 2;
    const realY =
      this.globalCoordinates.y - viewport.coordinates.y + viewport.size.y / 2;
    canvas.fillStyle = 'green';
    canvas.fillRect(realX, realY, this.size.x, this.size.y);
    canvas.strokeStyle = 'white';
    canvas.strokeRect(realX, realY, this.size.x, this.size.y);
  };
}
