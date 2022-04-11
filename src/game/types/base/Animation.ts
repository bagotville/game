export enum PlayerAnimation {
  IDLE = 'IDLE',
  WALK = 'WALK',
}

export type AnimationData = {
  imageWidth: number;
  imageHeight: number;
  imageColumns: number;
  imageRows: number;
  image: any;
  spriteWidth: number;
  spriteHeight: number;
  spriteX: number;
  spriteY: number;
  currentFrameCount: number;
};

export enum Direction {
  LEFT,
  RIGHT,
  UNDEFINED,
}
