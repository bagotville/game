import { LEVEL_01 } from './levels/levels';
import { IRenderableEntity } from './types/base/IRenderableEntity';
import { Player } from './types/implementation/gameObjects/Player';
import { Level } from './types/implementation/gameObjects/Level';
import { IInteractiveEntity } from './types/base/IInteractiveEntity';
import { ICollidableEntity } from './types/base/ICollidableEntity';
import { Camera } from './types/implementation/gameObjects/Camera';
import { IGameEntity } from './types/base/IGameEntity';
import { getNewId } from './types/implementation/ObjectsRegistrator';

export class Game {
  private gameObjects: IGameEntity[];

  private visualObjects: IRenderableEntity[];

  private canvas: HTMLCanvasElement;

  private canvasContext: CanvasRenderingContext2D;

  private camera: Camera;

  private player: Player;

  private interactiveObjects: IInteractiveEntity[];

  private collidableObjects: ICollidableEntity[];

  public start() {
    this.initialize();
    this.setupKeyboard();
    this.loadLevel();
    this.createCamera();
    this.setupRenderer();
  }

  private initialize() {
    this.interactiveObjects = [];
    this.visualObjects = [];
    this.gameObjects = [];
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
  }

  private setupKeyboard() {
    document.addEventListener('keydown', (keyEvent) => {
      this.interactiveObjects.forEach((subscriber) =>
        subscriber.onKeyDown(keyEvent),
      );
    });
    document.addEventListener('keyup', (keyEvent) => {
      this.interactiveObjects.forEach((subscriber) =>
        subscriber.onKeyUp(keyEvent),
      );
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
    requestAnimationFrame(this.render.bind(this));
  }

  private clearScreen() {
    this.canvasContext.fillStyle = 'black';
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
    const currentLevel = new Level(LEVEL_01);
    currentLevel
      .getGameObjects()
      .forEach((item) => this.gameObjects.push(item));
    currentLevel
      .getCollidableObjects()
      .forEach((item) => this.collidableObjects.push(item));
    currentLevel
      .getInteractiveObjects()
      .forEach((item) => this.interactiveObjects.push(item));
    currentLevel
      .getVisualObjects()
      .forEach((item) => this.visualObjects.push(item));
    this.player = currentLevel.getPlayer();
  }
}