import EventBus from '../../Utils/EventBus';
import { AnimationData, Direction, PlayerAnimation } from '../base/Animation';
import { ICharacterOptions } from '../base/ICharacterOptions';
import { ICollidableEntity } from '../base/ICollidableEntity';
import { ISpriteInfo } from '../base/ISpriteInfo';
import {
  characterEvents,
  COLLISION_LAG,
  GRAVITY_POWER,
  MAX_GRAVITY_POWER,
  PLAYER_X_SPEED,
  PLAYER_Y_SPEED as PLAYER_JUMP_SPEED,
  TIME_IN_AIR_BEFORE_DIE,
  VECTOR_KEYS,
} from './gameObjects/gameObjectsConstants';
import { Point } from './Point';
import { Rectangle, RectangleWithOwner } from './Rectangle';
import { Size } from './Size';
import { Speed } from './Speed';
import { Vector } from './Vector';

export abstract class InteractiveCharacter implements ICollidableEntity {
  constructor(id: number, coordinates: Point, size: Size, spriteInfo: ISpriteInfo, options?: ICharacterOptions) {
    this.id = id;
    this.globalCoordinates = coordinates;
    this.size = size;
    this.collideRectangle = new Rectangle(coordinates, size);
    this.vectors = [];
    this.speed = { x: 0, y: 0 };
    this.isOnTheGround = false;
    this.isLeftBlocked = false;
    this.isRightBlocked = false;
    this.sprites = spriteInfo;
    this.options = options;
    this.eventBus.on(characterEvents.COLLIDED, this.onCollideWithOtherRect);
  }

  isOnTheGround: boolean;

  isLeftBlocked: boolean;

  isRightBlocked: boolean;

  groundRectangle: Rectangle | null;

  collideRectangle: Rectangle;

  isMoving: boolean;

  sprites: ISpriteInfo;

  options?: ICharacterOptions;

  public eventBus: EventBus = new EventBus();

  moveCollideRectangle = () => {
    this.collideRectangle.coordinates.x = this.globalCoordinates.x;
    this.collideRectangle.coordinates.y = this.globalCoordinates.y;
  };

  isCollided: (other: ICollidableEntity) => boolean = (other) =>
    other.getCollisionRectangles().some((rect) => rect.isColidedWith(this.collideRectangle));

  onCollide: (other: ICollidableEntity) => void = (other) => {
    other.getCollisionRectangles().forEach((rect) => {
      if (rect.isColidedWith(this.collideRectangle)) {
        const rectWithOwner: RectangleWithOwner = { rect, owner: other };
        this.eventBus.emit(characterEvents.COLLIDED, rectWithOwner);
      }
    });
  };

  onCollideWithOtherRect: (other: RectangleWithOwner) => void = (other) => {
    this.checkCollisionLeft(other.rect);
    this.checkCollisionRight(other.rect);
    this.checkCollisionBottom(other.rect);
    this.checkCollisionTop(other.rect);
  };

  private checkCollisionRight(other: Rectangle) {
    if (Rectangle.isCollidedRight(this.collideRectangle, other)) {
      this.speed.x = 0;
      this.globalCoordinates.x = other.coordinates.x - this.size.x - COLLISION_LAG;
      this.isRightBlocked = true;
      this.eventBus.emit(characterEvents.COLLIDED_RIGHT);
    } else {
      this.isRightBlocked = false;
    }
  }

  private checkCollisionLeft(other: Rectangle) {
    if (Rectangle.isCollidedLeft(this.collideRectangle, other)) {
      this.speed.x = 0;
      this.globalCoordinates.x = other.coordinates.x + other.size.x + COLLISION_LAG;
      this.isLeftBlocked = true;
      this.eventBus.emit(characterEvents.COLLIDED_LEFT);
    } else {
      this.isLeftBlocked = false;
    }
  }

  private checkCollisionBottom(other: Rectangle) {
    if (Rectangle.isCollidedBottom(this.collideRectangle, other)) {
      this.speed.y = 0;
      this.isOnTheGround = true;
      this.groundRectangle = other;
      this.globalCoordinates.y = other.coordinates.y - this.size.y;
      this.vectors = this.vectors.filter((vector) => vector.key !== VECTOR_KEYS.JUMP);
      this.eventBus.emit(characterEvents.COLLIDED_BOTTOM);
    } else if (other === this.groundRectangle) {
      this.isOnTheGround = false;
      this.groundRectangle = null;
    }
    return this.isOnTheGround;
  }

  private checkCollisionTop(other: Rectangle) {
    if (Rectangle.isCollidedTop(this.collideRectangle, other)) {
      this.globalCoordinates.y += COLLISION_LAG;
      this.vectors = this.vectors.filter((vector) => vector.y >= 0);
      this.speed.y = 0;
      this.eventBus.emit(characterEvents.COLLIDED_TOP);
    }
  }

  getCollisionRectangles: () => Rectangle[] = () => [this.collideRectangle];

  private lastTSOnTheGround: number = 0;

  checkIsOnTheGround() {
    if (this.isOnTheGround && this.groundRectangle != null && this.checkCollisionBottom(this.groundRectangle)) {
      this.lastTSOnTheGround = +new Date() / 1000;
      return true;
    }
    this.checkIsFallenToDeath();
    return false;
  }

  private checkIsFallenToDeath() {
    if (this.lastTSOnTheGround !== 0 && +new Date() / 1000 - this.lastTSOnTheGround >= TIME_IN_AIR_BEFORE_DIE) {
      this.die();
    }
  }

  abstract die(): void;

  render: (canvas: CanvasRenderingContext2D, viewport: Rectangle) => void = (canvas, viewport) => {
    const absoluteVector: Vector = { x: 0, y: 0, key: VECTOR_KEYS.UNDEFINED };
    this.vectors.forEach((vector) => {
      absoluteVector.x += vector.x;
      absoluteVector.y += vector.y;
    });
    this.speed.x += (absoluteVector.x - this.speed.x) / 4;
    this.speed.y += absoluteVector.y - this.speed.y;
    let maxSpeed = PLAYER_X_SPEED;
    if (this.options && this.options.maxSpeed) {
      maxSpeed = this.options.maxSpeed;
    }
    if (Math.abs(this.speed.x) > maxSpeed) {
      this.speed.x = this.speed.x > 0 ? maxSpeed : -maxSpeed;
    }
    if (!this.checkIsOnTheGround()) {
      if (this.speed.y < MAX_GRAVITY_POWER) this.vectors.push({ x: 0, y: GRAVITY_POWER, key: VECTOR_KEYS.GRAVITY });
      // this.speed.y += GRAVITY_POWER;
    } else {
      this.vectors = this.vectors.filter((vector) => vector.key !== VECTOR_KEYS.GRAVITY);
    }
    this.draw(canvas, viewport);
  };

  refresh: () => void = () => {
    if ((this.speed.x > 0 && !this.isRightBlocked) || (this.speed.x < 0 && !this.isLeftBlocked)) {
      this.globalCoordinates.x += this.speed.x;
    }
    if ((this.speed.y > 0 && !this.isOnTheGround) || this.speed.y < 0) {
      this.globalCoordinates.y += this.speed.y;
    }
    this.moveCollideRectangle();
  };

  globalCoordinates: Point;

  vectors: Vector[];

  size: Size;

  speed: Speed;

  id: number;

  protected moveLeft() {
    if (!this.vectors.some((vector) => vector.key === VECTOR_KEYS.MOVE_LEFT)) {
      this.vectors.push({
        x: -PLAYER_X_SPEED,
        y: 0,
        key: VECTOR_KEYS.MOVE_LEFT,
      });
      this.isMoving = true;
    }
  }

  protected stopLeft() {
    this.vectors = this.vectors.filter((vector) => vector.key !== VECTOR_KEYS.MOVE_LEFT);
    this.isMoving = false;
  }

  protected moveRight() {
    if (!this.vectors.some((vector) => vector.key === VECTOR_KEYS.MOVE_RIGHT)) {
      this.vectors.push({
        x: PLAYER_X_SPEED,
        y: 0,
        key: VECTOR_KEYS.MOVE_RIGHT,
      });
      this.isMoving = true;
    }
  }

  protected stopRight() {
    this.vectors = this.vectors.filter((vector) => vector.key !== VECTOR_KEYS.MOVE_RIGHT);
    this.isMoving = false;
  }

  protected jump() {
    if (this.isOnTheGround) {
      this.vectors.push({ x: 0, y: -PLAYER_JUMP_SPEED, key: VECTOR_KEYS.JUMP });
      this.globalCoordinates.y -= COLLISION_LAG * 2;
    }
  }

  // sprite
  private techAnimationCounter: number = Number.MIN_SAFE_INTEGER;

  private animationCounter: number = 0;

  private prevAnimation: PlayerAnimation;

  private prevDirection: Direction;

  getCurrentAnimation(): PlayerAnimation {
    if (this.isMoving) {
      return PlayerAnimation.WALK;
    }
    return PlayerAnimation.IDLE;
  }

  getAnimationFrame(): AnimationData {
    const currentAnim = this.getCurrentAnimation();
    this.resetCounterIfChanged(currentAnim);
    let currentImgColumns;
    let currentImg;

    switch (currentAnim) {
      case PlayerAnimation.WALK: {
        currentImg = this.getDependentOnDirection(this.sprites.moveLeftSprite, this.sprites.moveRightSprite);
        currentImgColumns = this.sprites.moveColumns;
        break;
      }
      case PlayerAnimation.IDLE:
      default: {
        currentImg = this.getDependentOnDirection(this.sprites.idleLeftSprite, this.sprites.idleRightSprite);
        currentImgColumns = this.sprites.idleColumns;
        break;
      }
    }
    const currentFrameCount = this.getNewFrame(currentAnim);
    const spriteWidth = currentImg.width / currentImgColumns;
    const spriteHeight = currentImg.height;

    return {
      imageWidth: currentImg.width,
      imageHeight: currentImg.height,
      imageColumns: currentImgColumns,
      imageRows: 1,
      image: currentImg,
      spriteWidth,
      spriteHeight,
      spriteX: currentFrameCount * spriteWidth,
      spriteY: 0,
      currentFrameCount,
    };
  }

  private getDependentOnDirection(leftImg: HTMLImageElement, rightImg: HTMLImageElement) {
    const direction = this.getDirection();
    const { prevDirection } = this;

    if (direction === Direction.RIGHT || (direction === Direction.UNDEFINED && prevDirection === Direction.RIGHT)) {
      return rightImg;
    }

    if (direction === Direction.LEFT || (direction === Direction.UNDEFINED && prevDirection === Direction.LEFT)) {
      return leftImg;
    }
    return rightImg;
  }

  getDirection() {
    const xVector = this.vectors.reduce((prev, next) => prev + next.x, 0);
    if (xVector > 0) {
      this.prevDirection = Direction.RIGHT;
      return Direction.RIGHT;
    }
    if (xVector < 0) {
      this.prevDirection = Direction.LEFT;
      return Direction.LEFT;
    }
    return Direction.UNDEFINED;
  }

  resetCounterIfChanged(current: PlayerAnimation) {
    if (this.prevAnimation !== current) {
      this.animationCounter = 0;
      this.prevAnimation = current;
    }
  }

  getNewFrame(currentAnimation: PlayerAnimation) {
    this.techAnimationCounter++;
    if (this.techAnimationCounter > Number.MAX_SAFE_INTEGER) {
      this.techAnimationCounter = Number.MIN_SAFE_INTEGER;
    }
    const currentAnimationRate = this.getCurrentAnimationRate(currentAnimation);
    if (Math.floor(this.techAnimationCounter % currentAnimationRate) === 0) {
      this.animationCounter++;
      if (
        (currentAnimation === PlayerAnimation.WALK && this.animationCounter >= this.sprites.moveColumns) ||
        (currentAnimation === PlayerAnimation.IDLE && this.animationCounter >= this.sprites.idleColumns)
      ) {
        this.animationCounter = 0;
      }
    }
    return this.animationCounter;
  }

  private getCurrentAnimationRate(currentAnim: PlayerAnimation) {
    if (currentAnim === PlayerAnimation.IDLE) {
      return this.sprites.idleAnimationRate;
    }
    return this.sprites.moveAnimationRate;
  }

  draw: (canvas: CanvasRenderingContext2D, viewport: Rectangle) => void = (canvas, viewport) => {
    const realX = this.globalCoordinates.x - viewport.coordinates.x + viewport.size.x / 2;
    const realY = this.globalCoordinates.y - viewport.coordinates.y + viewport.size.y / 2;

    const frame = this.getAnimationFrame();
    canvas.drawImage(
      frame.image, // image to draw
      frame.spriteX, // x position on sprite img
      frame.spriteY, // y position on sprite img
      frame.spriteWidth, // width to take from sprite img
      frame.spriteHeight, // height to take from sprite img
      realX - this.size.x / 1.5, // canvas x
      realY - this.size.y / 1.3, // canvas y
      this.size.x * this.sprites.scaleRate, // scale width on canvas
      this.size.y * this.sprites.scaleRate,
    ); // scale height on canvas
  };
}
