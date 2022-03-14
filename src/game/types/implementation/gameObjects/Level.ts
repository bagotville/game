import { ICollidableEntity } from '../../base/ICollidableEntity';
import { IGameEntity } from '../../base/IGameEntity';
import { IInteractiveEntity } from '../../base/IInteractiveEntity';
import { getNewId } from '../ObjectsRegistrator';
import { Point } from '../Point';
import { Size } from '../Size';
import { Code } from './Code';
import {
  DEFAULT_WALL_HEIGHT,
  DEFAULT_WALL_WIDTH,
  LEVEL_OBJECT_TYPE,
  PLAYER_SIZE,
} from './gameObjectsConstants';
import { Player } from './Player';

export class Level {
  private levelData: string;

  private visualElements: ICollidableEntity[];

  private gameObjects: IGameEntity[];

  private player: Player;

  private collidableObjects: ICollidableEntity[];

  private interactiveObjects: IInteractiveEntity[];

  constructor(levelData: string) {
    this.levelData = levelData.replace('\t', '    ');
    this.visualElements = [];
    this.gameObjects = [];
    this.collidableObjects = [];
    this.interactiveObjects = [];
    this.generateLevel();
  }

  generateLevel() {
    if (this.validateLevel()) {
      this.parseLevel();
    } else {
      // Можно придумать что-нибудь поумнее
      throw new Error('Provided level is incorrect');
    }
  }

  parseLevel() {
    const dataByRows = this.levelData.split('\n');
    let lastType: string | null = null;
    let sequenceCounter = 1;
    let row = 1;
    let col = 1;
    dataByRows.forEach((data) => {
      const currentRow = data.trim();
      col = 1;
      sequenceCounter = 1;
      for (let i = 0; i < currentRow.length; i++) {
        const currentChar = currentRow[i];
        if (lastType !== null && lastType !== currentChar) {
          this.generateObject(lastType, sequenceCounter, {
            x: (col - 1 - sequenceCounter) * 50,
            y: row * 50,
          });
          sequenceCounter = 1;
        }
        if (i + 1 === currentRow.length) {
          this.generateObject(currentChar, sequenceCounter, {
            x: (col - 1 - sequenceCounter) * 50,
            y: row * 50,
          });
        }
        if (lastType === currentChar) {
          sequenceCounter++;
        }
        lastType = currentChar;
        col++;
      }
      lastType = null;
      row++;
    });
  }

  generateObject(type: string, count: number, coordinates: Point) {
    if (type.length !== 1) {
      throw new Error('Object type must be of length 1');
    }
    switch (type) {
      case LEVEL_OBJECT_TYPE.WALL:
        this.createWall(coordinates, {
          x: DEFAULT_WALL_WIDTH * count,
          y: DEFAULT_WALL_HEIGHT,
        });
        break;
      case LEVEL_OBJECT_TYPE.PLAYER:
        this.createPlayer(coordinates);
        break;
      case LEVEL_OBJECT_TYPE.FREE_SPACE:
        break;
      default:
        throw new Error('unknown object type');
    }
  }

  validateLevel() {
    // TODO можно придумать что валидировать. Пока проверяем только наличие игрока
    return this.levelData.indexOf('0') > 0;
  }

  createWall(coordinates: Point, size: Size) {
    const newWall = new Code(getNewId(), coordinates, size);
    this.visualElements.push(newWall);
    this.collidableObjects.push(newWall);
    this.gameObjects.push(newWall);
  }

  createPlayer(coordinates: Point) {
    const player = new Player(getNewId(), coordinates, PLAYER_SIZE);
    this.visualElements.push(player);
    this.collidableObjects.push(player);
    this.gameObjects.push(player);
    this.interactiveObjects.push(player);
    this.player = player;
  }

  getGameObjects() {
    return this.gameObjects;
  }

  getVisualObjects() {
    return this.visualElements;
  }

  getCollidableObjects() {
    return this.collidableObjects;
  }

  getPlayer() {
    return this.player;
  }

  getInteractiveObjects() {
    return this.interactiveObjects;
  }
}
