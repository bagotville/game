import { ICharacterOptions } from '../../base/ICharacterOptions';
import { IInteractiveEntity } from '../../base/IInteractiveEntity';
import { ISpriteInfo } from '../../base/ISpriteInfo';
import { InteractiveCharacter } from '../Character';
import { Point } from '../Point';
import { RectangleWithOwner } from '../Rectangle';
import { Size } from '../Size';
import { characterEvents, HIT_PROTECTION_TIME, KEYS, playerEvents, DEFAULT_PLAYER_LIFES } from './gameObjectsConstants';

export class Player extends InteractiveCharacter implements IInteractiveEntity {
  constructor(id: number, coordinates: Point, size: Size, spriteInfo: ISpriteInfo, options?: ICharacterOptions) {
    super(id, coordinates, size, spriteInfo, options);
    this.eventBus.on(characterEvents.COLLIDED, this.checkCollision.bind(this));
  }

  private isHitted = false;

  private lastHitted: number = 0;

  public lifes: number = DEFAULT_PLAYER_LIFES;

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

  checkCollision(other: RectangleWithOwner) {
    if ((other.owner as any).isEnemy) {
      this.checkHitProtection();
      if (!this.isHitted) {
        this.eventBus.emit(playerEvents.LOST_LIFE);
        this.isHitted = true;
        this.lastHitted = +new Date() / 1000;
      }
    }
  }

  private checkHitProtection() {
    if (this.isHitted) {
      const currentTime = +new Date() / 1000;
      if (currentTime - this.lastHitted >= HIT_PROTECTION_TIME) {
        this.isHitted = false;
        this.lastHitted = 0;
      }
    }
  }
    
  die(): void {
    this.lifes = 0;
  }
}
