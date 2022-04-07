import {
  characterEvents,
  COIN_SIZE,
  COIN_SPRITE_INFO,
  gameEvents,
  playerEvents,
} from './gameObjects/gameObjectsConstants';
import { Player } from './gameObjects/Player';
import { InteractiveCharacter } from './InteractiveCharacter';
import { Point } from './Point';
import { RectangleWithOwner } from './Rectangle';

export class Coin extends InteractiveCharacter {
  constructor(id: number, coordinates: Point) {
    super(id, coordinates, COIN_SIZE, COIN_SPRITE_INFO);
    this.collideRectangle.size.x += 15;
    this.collideRectangle.coordinates.x -= 7.5;
    this.setupBehaviour();
  }

  setupBehaviour() {
    this.eventBus.on(characterEvents.COLLIDED, (other: RectangleWithOwner) => {
      if ((other.owner as Player).isPlayer) {
        this.eventBus.emit(gameEvents.COLLECTED_COIN);
        this.eventBus.emit(playerEvents.DIED);
      }
    });
  }

  die() {}
}
