import { IRenderableEntity } from './types/base/IRenderableEntity';
import { Player } from './types/implementation/gameObjects/Player';
import { Level } from './types/implementation/gameObjects/Level';
import { IInteractiveEntity } from './types/base/IInteractiveEntity';
import { ICollidableEntity } from './types/base/ICollidableEntity';
import { Camera } from './types/implementation/gameObjects/Camera';
import { IGameEntity } from './types/base/IGameEntity';
import { getNewId } from './types/implementation/ObjectsRegistrator';

export class Game {
  constructor(level: string) {
    this.currentLevel = level;
  }

  private gameObjects: IGameEntity[];

  private visualObjects: IRenderableEntity[];

  private canvas: HTMLCanvasElement;

  private canvasContext: CanvasRenderingContext2D;

  private camera: Camera;

  private currentLevel: string;

  private player: Player;

  private interactiveObjects: IInteractiveEntity[];

  private collidableObjects: ICollidableEntity[];

  private isGameOver: boolean;

  private gameEndEventSubscribers: (() => void)[] = [];

  public start() {
    this.initialize();
    this.setupKeyboard();
    this.loadLevel();
    this.createCamera();
    this.setupRenderer();
  }

  public subscribeForGameEndEvent(callback: () => void) {
    this.gameEndEventSubscribers.push(callback);
  }

  private initialize() {
    this.interactiveObjects = [];
    this.visualObjects = [];
    this.gameObjects = [];
    this.collidableObjects = [];
    this.isGameOver = false;
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

  private render() {
    this.gameObjects.forEach((obj) => obj.refresh());
    this.checkForCollisions();
    this.clearScreen();
    this.visualObjects.forEach((item) => {
      item.render(this.canvasContext, this.camera.getViewportRectangle());
    });
    this.checkForGameEnd();
    if (!this.isGameOver) {
      requestAnimationFrame(this.render.bind(this));
    } else {
      this.callGameEnd();
    }
  }

  private callGameEnd() {
    this.gameEndEventSubscribers.forEach((callback) => callback());
  }

  private checkForGameEnd() {
    if (this.player && this.player.lifes <= 0) {
      this.isGameOver = true;
    }
  }

  private clearScreen() {
    this.canvasContext.fillStyle = '#222';
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
    this.player = currentLevel.getPlayer();
  }
}
