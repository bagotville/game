import { ICharacterOptions } from '../base/ICharacterOptions';
import { ISpriteInfo } from '../base/ISpriteInfo';
import { InteractiveCharacter } from './Character';
import { characterEvents } from './gameObjects/gameObjectsConstants';
import { Point } from './Point';
import { Size } from './Size';

export class MoveLeftRightEnemy extends InteractiveCharacter {
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
}
