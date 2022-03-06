import Entity, { StartCoords } from './Entity';
import Game from './Game';
import { CELL_SIDE } from './global';
import src from '../assets/wall.svg';

const settings = {
  src,
  speed: 0,
  factor: 0,
  width: CELL_SIDE,
  height: CELL_SIDE,
};
export default class Wall extends Entity {
  start: false;

  stop: false;

  constructor(coords: StartCoords, game: Game) {
    super(settings, coords, game);
  }
}
