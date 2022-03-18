import { IInteractiveEntity } from '../../base/IInteractiveEntity';
import { InteractiveCharacter } from '../Character';
import { KEYS } from './gameObjectsConstants';

export class Player extends InteractiveCharacter implements IInteractiveEntity {
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
}
