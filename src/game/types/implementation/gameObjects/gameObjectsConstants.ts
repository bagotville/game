import { ISpriteInfo } from '../../base/ISpriteInfo';
import { Size } from '../Size';
import { Vector } from '../Vector';

export const CODE_WIDTH = 10;
export const CODE_HEIGHT = 30;

export const PLAYER_WIDTH = 50;
export const PLAYER_HEIGHT = 50;
export const PLAYER_X_SPEED = 7;
export const PLAYER_Y_SPEED = 7;
export const DEFAULT_PLAYER_LIFES = 3;
export const COLLISION_LAG = 4;

export const GRAVITY_POWER = 0.9;
export const MAX_GRAVITY_POWER = 14;
export const VECTOR_APPLY_FREQUENCY = 5;

export const TIME_IN_AIR_BEFORE_DIE = 3;

export const VECTOR_KEYS = {
  MOVE_LEFT: 'move-left',
  MOVE_RIGHT: 'move-right',
  JUMP: 'jump',
  GRAVITY: 'gravity',
  UNDEFINED: 'undefined',
};

export const KEYS = {
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
};

export const LEVEL_OBJECT_TYPE = {
  WALL: '#',
  PLAYER: '0',
  MOVE_LEFT_RIGHT_ENEMY: '+',
  COIN: '$',
  FREE_SPACE: ' ',
  ESCAPE: 'E',
};

export const DEFAULT_WALL_WIDTH = 50;

export const DEFAULT_WALL_HEIGHT = 50;

export const PLAYER_SIZE: Size = {
  x: 45,
  y: 45,
};

export const CANVAS_FONT_SIZE = 30;

export const CANVAS_FONT = `${CANVAS_FONT_SIZE}px consolas`;

export const PLAYER_IDLE_COLUMNS = 4;
export const PLAYER_WALK_COLUMNS = 6;

const playerIdleSpriteRight = new Image();
playerIdleSpriteRight.src = '/sprites/player/IdleRight.png';

const playerIdleSpriteLeft = new Image();
playerIdleSpriteLeft.src = '/sprites/player/IdleLeft.png';

const playerWalkSpriteRight = new Image();
playerWalkSpriteRight.src = '/sprites/player/WalkRight.png';

const playerWalkSpriteLeft = new Image();
playerWalkSpriteLeft.src = '/sprites/player/WalkLeft.png';

export const HEART_SPRITE = new Image();
HEART_SPRITE.src = '/sprites/heart.png';

// замедляет анимацию. Чем меньше тем чаще будет происходить смена кадров спрайта
const playerIdleAnimationRate = 10;
const playerMoveAnimationRate = 3;

export const PLAYER_SPRITE_INFO: ISpriteInfo = {
  idleAnimationRate: playerIdleAnimationRate,
  moveAnimationRate: playerMoveAnimationRate,
  idleColumns: 4,
  moveColumns: 6,
  scaleRate: 2,
  idleLeftSprite: playerIdleSpriteLeft,
  idleRightSprite: playerIdleSpriteRight,
  moveLeftSprite: playerWalkSpriteLeft,
  moveRightSprite: playerWalkSpriteRight,
};

const machine1IdleAnimationRate = 10;
const machine1MoveAnimationRate = 3;
export const MACHINE1_SIZE: Size = {
  x: 45,
  y: 45,
};
const machine1IdleSpriteRight = new Image();
machine1IdleSpriteRight.src = '/sprites/machine1/IdleRight.png';

const machine1IdleSpriteLeft = new Image();
machine1IdleSpriteLeft.src = '/sprites/machine1/IdleLeft.png';

const machine1WalkSpriteRight = new Image();
machine1WalkSpriteRight.src = '/sprites/machine1/WalkRight.png';

const machine1WalkSpriteLeft = new Image();
machine1WalkSpriteLeft.src = '/sprites/machine1/WalkLeft.png';

const coinSprite = new Image();
coinSprite.src = '/sprites/coin/coin.png';

const coinAnimationRate = 6;

export const COIN_SIZE: Size = {
  x: 20,
  y: 20,
};

export const COIN_SPRITE_INFO: ISpriteInfo = {
  idleAnimationRate: coinAnimationRate,
  moveAnimationRate: coinAnimationRate,
  idleColumns: 6,
  moveColumns: 6,
  scaleRate: 2,
  moveRows: 1,
  idleRows: 1,
  idleLeftSprite: coinSprite,
  idleRightSprite: coinSprite,
  moveLeftSprite: coinSprite,
  moveRightSprite: coinSprite,
};

export const MACHINE1_MAX_SPEED = 2;

export const MACHINE_1_SPRITE_INFO: ISpriteInfo = {
  idleAnimationRate: machine1IdleAnimationRate,
  moveAnimationRate: machine1MoveAnimationRate,
  idleColumns: 4,
  moveColumns: 4,
  scaleRate: 2,
  idleLeftSprite: machine1IdleSpriteLeft,
  idleRightSprite: machine1IdleSpriteRight,
  moveLeftSprite: machine1WalkSpriteLeft,
  moveRightSprite: machine1WalkSpriteRight,
};

export enum characterEvents {
  COLLIDED_LEFT = 'COLLIDED_LEFT',
  COLLIDED_RIGHT = 'COLLIDED_RIGHT',
  COLLIDED_TOP = 'COLLIDED_TOP',
  COLLIDED_BOTTOM = 'COLLIDED_BOTTOM',
  COLLIDED = 'COLLIDED',
}

export enum playerEvents {
  DIED = 'DIED',
  LOST_LIFE = 'LOST_LIFE',
}

export enum gameEvents {
  COLLECTED_COIN = 'COLLECTED_COIN',
  SMALL_ENEMY_KILLED = 'SMALL_ENEMY_KILLED',
}

export const HIT_PROTECTION_TIME = 2;

export const GRAVITY_VECTOR: Vector = {
  x: 0,
  y: GRAVITY_POWER,
  key: VECTOR_KEYS.GRAVITY,
};
