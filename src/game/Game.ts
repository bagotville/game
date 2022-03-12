import { testLevel } from './levels/test';
import { IRenderableEntity } from './types/base/IRenderableEntity';
import { Point } from './types/implementation/Point';
import { Player } from './types/implementation/gameObjects/Player';
import { Level } from './types/implementation/gameObjects/Level';
import { IInteractiveEntity } from './types/base/IInteractiveEntity';
import { ICollidableEntity } from './types/base/ICollidableEntity';

export class Game {
  private visualObjects: IRenderableEntity[];

  private canvas: HTMLCanvasElement;

  private canvasContext: CanvasRenderingContext2D;

  private cameraCoordinates: Point;

  private keyEventSubscribers: IInteractiveEntity[];

  private collidableObjects: ICollidableEntity[];

  public start() {
    this.initialize();
    this.setupKeyboard();
    this.loadLevel();
    this.createPlayer();
    this.setupRenderer();
  }

  private initialize() {
    this.keyEventSubscribers = [];
    this.visualObjects = [];
    this.collidableObjects = [];
    this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    const optionalContext = this.canvas.getContext('2d');
    if (optionalContext) {
      this.canvasContext = optionalContext;
    } else {
      throw new Error('unable to setup canvas');
    }
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cameraCoordinates = {
      x: 0,
      y: 0,
    };
  }

  private setupKeyboard() {
    document.addEventListener('keydown', (keyEvent) => {
      this.keyEventSubscribers.forEach((subscriber) =>
        subscriber.onKeyDown(keyEvent),
      );
    });
    document.addEventListener('keyup', (keyEvent) => {
      this.keyEventSubscribers.forEach((subscriber) =>
        subscriber.onKeyUp(keyEvent),
      );
    });
  }

  private setupRenderer() {
    this.render();
  }

  private render() {
    this.visualObjects.forEach((obj) => obj.move());
    this.checkForCollisions();
    this.clearScreen();
    this.visualObjects.forEach((item) => {
      item.render(this.canvasContext);
    });
    requestAnimationFrame(this.render.bind(this));
  }

  private clearScreen() {
    this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
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

  private loadLevel() {
    // TODO реализовать загрузку разных уровней
    // пока заглушка
    this.applyLevel(testLevel);
  }

  private createPlayer() {
    const player = new Player(1, { x: 50, y: 50 }, { x: 50, y: 50 });
    this.visualObjects.push(player);
    this.collidableObjects.push(player);
    this.keyEventSubscribers.push(player);
  }

  private applyLevel(levelData: string) {
    const level = new Level(101, levelData);
    this.visualObjects.push(level);
    this.collidableObjects.push(level);
  }
}
