import { InteractiveCharacter } from '../InteractiveCharacter';
import { Rectangle } from '../Rectangle';

export class Player extends InteractiveCharacter {
  draw: (canvas: CanvasRenderingContext2D, viewport: Rectangle) => void = (
    canvas,
    viewport,
  ) => {
    canvas.fillStyle = 'green';
    canvas.fillRect(
      this.globalCoordinates.x - viewport.coordinates.x + viewport.size.x / 2,
      this.globalCoordinates.y - viewport.coordinates.y + viewport.size.y / 2,
      this.size.x,
      this.size.y,
    );
  };
}
