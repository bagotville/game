import { Size } from '../Size';

export const CODE_WIDTH = 10;
export const CODE_HEIGHT = 30;

export const PLAYER_WIDTH = 50;
export const PLAYER_HEIGHT = 50;
export const PLAYER_X_SPEED = 7;
export const PLAYER_Y_SPEED = 14;
export const COLLISION_LAG = 4;

export const GRAVITY_POWER = 0.9;
export const MAX_GRAVITY_POWER = 14;
export const VECTOR_APPLY_FREQUENCY = 5;

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
  FREE_SPACE: ' ',
};

export const DEFAULT_WALL_WIDTH = 50;

export const DEFAULT_WALL_HEIGHT = 50;

export const PLAYER_SIZE: Size = {
  x: 45,
  y: 45,
};

export const CANVAS_FONT_SIZE = 30;

export const CANVAS_FONT = `${CANVAS_FONT_SIZE}px consolas`;
