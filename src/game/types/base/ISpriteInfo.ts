export interface ISpriteInfo {
  idleLeftSprite: HTMLImageElement;
  idleRightSprite: HTMLImageElement;
  idleColumns: number;
  idleRows?: number;
  moveLeftSprite: HTMLImageElement;
  moveRightSprite: HTMLImageElement;
  moveColumns: number;
  moveRows?: number;
  scaleRate: number;
  idleAnimationRate: number;
  moveAnimationRate: number;
}
