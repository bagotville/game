import { IRenderableEntity } from './types/base/IRenderableEntity';
import { Player } from './types/implementation/gameObjects/Player';
import { Level } from './types/implementation/gameObjects/Level';
import { IInteractiveEntity } from './types/base/IInteractiveEntity';
import { ICollidableEntity } from './types/base/ICollidableEntity';
import { Camera } from './types/implementation/gameObjects/Camera';
import { IGameEntity } from './types/base/IGameEntity';
import { getNewId } from './types/implementation/ObjectsRegistrator';
import { gameEvents, HEART_SPRITE, playerEvents } from './types/implementation/gameObjects/gameObjectsConstants';
import { IRemovable } from './types/base/IRemovable';
import { IEventEmitters } from './types/base/IEventEmmiters';
import { EndReason } from '../pages/Game/GamePage.types';
import { Escape } from './types/implementation/Escape';
import { FPS } from './gameConstants';

export class Game {
  constructor(level: string) {
    this.currentLevel = level;
  }

  private gameObjects: IGameEntity[];

  private eventProviders: IEventEmitters[];

  private visualObjects: IRenderableEntity[];

  private canvas: HTMLCanvasElement;

  private canvasContext: CanvasRenderingContext2D;

  private camera: Camera;

  private currentLevel: string;

  private player: Player;

  private score: number;

  private interactiveObjects: IInteractiveEntity[];

  private collidableObjects: ICollidableEntity[];

  private escape: Escape;

  private removable: IRemovable[];

  private isGameOver: boolean;

  private gameEndReason: EndReason;

  private gameEndEventSubscribers: ((reason: EndReason, score: number) => void)[] = [];

  public start() {
    this.initialize();
    this.setupKeyboard();
    this.loadLevel();
    this.addEvents();
    this.createCamera();
    this.setupRenderer();
  }

  public subscribeForGameEndEvent(callback: (reason: EndReason, score: number) => void) {
    this.gameEndEventSubscribers.push(callback);
  }

  private initialize() {
    this.interactiveObjects = [];
    this.visualObjects = [];
    this.gameObjects = [];
    this.removable = [];
    this.collidableObjects = [];
    this.eventProviders = [];
    this.isGameOver = false;
    this.score = 0;
    this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    const optionalContext = this.canvas.getContext('2d');
    if (optionalContext) {
      this.canvasContext = optionalContext;
    } else {
      throw new Error('unable to setup canvas');
    }
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  private setupKeyboard() {
    document.addEventListener('keydown', (keyEvent) => {
      this.interactiveObjects.forEach((subscriber) => subscriber.onKeyDown(keyEvent));
    });
    document.addEventListener('keyup', (keyEvent) => {
      this.interactiveObjects.forEach((subscriber) => subscriber.onKeyUp(keyEvent));
    });
  }

  private setupRenderer() {
    this.render();
  }

  private now: number;

  private lastRender: number = Date.now();

  private interval = 1000 / FPS;

  private render() {
    this.checkForGameEnd();
    if (!this.isGameOver) {
      requestAnimationFrame(this.render.bind(this));
    } else {
      this.callGameEnd(this.gameEndReason);
    }
    this.now = Date.now();

    const diff = this.now - this.lastRender;
    if (diff > this.interval) {
      this.gameObjects.forEach((obj) => obj.refresh());
      this.checkForCollisions();
      this.clearScreen();
      this.visualObjects.forEach((item) => {
        item.render(this.canvasContext, this.camera.getViewportRectangle());
      });
      this.drawLifes();
      this.drawScore();
      this.lastRender = Date.now();
    }
  }
  // TODO: Нормальный расчёт координат для HUD'а

  private drawLifes() {
    const { lifes } = this.player;
    const heartWidth = HEART_SPRITE.width * 2;
    const heartHeight = HEART_SPRITE.height * 2;
    for (let i = 0; i < lifes; i++) {
      this.canvasContext.drawImage(
        HEART_SPRITE,
        32 + i * heartWidth + 16 * i,
        80 - heartHeight - 10,
        heartWidth,
        heartHeight,
      );
    }
  }

  private drawScore() {
    const { score } = this;
    const x = HEART_SPRITE.width * 6 + 120;
    this.canvasContext.font = '40px Consolas';
    this.canvasContext.fillStyle = '#96939B';
    this.canvasContext.fillText(`score: `, x, 59);
    this.canvasContext.font = '36px Consolas';
    this.canvasContext.fillStyle = '#FFFFFF';
    this.canvasContext.fillText(`${score}`, x + 150, 59);
  }

  private callGameEnd(reason: EndReason) {
    this.gameEndEventSubscribers.forEach((callback) => callback(reason, this.score));
  }

  private checkForGameEnd() {
    if (this.player && this.player.lifes <= 0) {
      this.gameEndReason = EndReason.DIED;
      this.isGameOver = true;
    }
  }

  private clearScreen() {
    this.canvasContext.fillStyle = '#282729';
    this.canvasContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private checkForCollisions() {
    for (let i = 0; i < this.collidableObjects.length; i++) {
      for (let j = i + 1; j < this.collidableObjects.length; j++) {
        const first = this.collidableObjects[i];
        const second = this.collidableObjects[j];
        if (first.isCollided(second)) {
          first.onCollide(second);
          second.onCollide(first);
        }
      }
    }
  }

  private createCamera() {
    this.camera = new Camera(
      getNewId(),
      {
        x: this.player.globalCoordinates.x,
        y: this.player.globalCoordinates.y,
      },
      { x: this.canvas.width, y: this.canvas.height },
      { x: 0, y: 0 },
    );
    this.gameObjects.push(this.camera);
    this.camera.follow(this.player);
  }

  private loadLevel() {
    const currentLevel = new Level(this.currentLevel);
    currentLevel.getGameObjects().forEach((item) => this.gameObjects.push(item));
    currentLevel.getCollidableObjects().forEach((item) => this.collidableObjects.push(item));
    currentLevel.getInteractiveObjects().forEach((item) => this.interactiveObjects.push(item));
    currentLevel.getVisualObjects().forEach((item) => this.visualObjects.push(item));
    currentLevel.getRemovableObjects().forEach((item) => this.removable.push(item));
    currentLevel.getEventEmmiters().forEach((item) => this.eventProviders.push(item));
    this.escape = currentLevel.getEscape();
    this.player = currentLevel.getPlayer();
  }

  private addEvents() {
    this.eventProviders.forEach((item) => {
      item.eventBus.on(playerEvents.DIED, () => {
        this.gameObjects = this.gameObjects.filter((go) => go !== (item as any));
        this.collidableObjects = this.collidableObjects.filter((co) => co !== (item as any));
        this.interactiveObjects = this.interactiveObjects.filter((io) => io !== (item as any));
        this.visualObjects = this.visualObjects.filter((vo) => vo !== (item as any));
        this.removable = this.removable.filter((ro) => ro !== item);
        this.eventProviders = this.eventProviders.filter((ep) => ep !== item);
      });

      item.eventBus.on(gameEvents.COLLECTED_COIN, () => {
        this.score += 50;
      });

      item.eventBus.on(gameEvents.SMALL_ENEMY_KILLED, () => {
        this.score += 100;
      });

      this.escape.subscribeForGameEndEvent(() => this.callGameEnd(EndReason.ESCAPED));
    });
  }
}
