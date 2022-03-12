import { InteractiveCharacter } from '../InteractiveCharacter';

export class Player extends InteractiveCharacter {
  draw: (canvas: CanvasRenderingContext2D) => void = (canvas) => {
    canvas.fillStyle = 'green';
    canvas.fillRect(
      this.coordinates.x,
      this.coordinates.y,
      this.size.x,
      this.size.y,
    );
  };
}
