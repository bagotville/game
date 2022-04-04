import { ICharacterOptions } from '../base/ICharacterOptions';
import { ISpriteInfo } from '../base/ISpriteInfo';
import { InteractiveCharacter } from './InteractiveCharacter';
import { characterEvents } from './gameObjects/gameObjectsConstants';
import { Point } from './Point';
import { Size } from './Size';
import { Rectangle } from './Rectangle';

export class MoveLeftRightEnemy extends InteractiveCharacter {
  private isDied: boolean = false;

  die(): void {
    this.isDied = true;
  }

  constructor(id: number, coordinates: Point, size: Size, spriteInfo: ISpriteInfo, options?: ICharacterOptions) {
    super(id, coordinates, size, spriteInfo, options);
    this.setupBehaviour();
  }

  public isEnemy: boolean = true;

  private setupBehaviour() {
    this.eventBus.on(characterEvents.COLLIDED_RIGHT, () => {
      this.stopRight();
      this.moveLeft();
    });
    this.eventBus.on(characterEvents.COLLIDED_LEFT, () => {
      this.stopLeft();
      this.moveRight();
    });
    this.moveRight();
  }

  draw(canvas: CanvasRenderingContext2D, viewport: Rectangle) {
    if (!this.isDied) {
      super.draw(canvas, viewport);
    }
  }
}
