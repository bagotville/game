import Entity, { Sector } from './Entity';
import Player from './Player';
import Wall from './Wall';
import { CELL_SIDE, LevelMap } from './global';
import Game from './Game';

type EntityRole = 'decorations' | 'objects';

type LevelDictironary = {
  [K in EntitySign]: {
    role: EntityRole;
    plane?: boolean;
    //  TODO: Более продвинутая подставновка сущностей
    Entity: typeof Player | typeof Wall;
  };
};

type EntitySign = 'x' | '@';

const checkList: EntitySign[] = ['x', '@'];

const levelDictironary: LevelDictironary = {
  x: {
    role: 'decorations',
    plane: true,
    Entity: Wall,
  },
  '@': {
    role: 'objects',
    Entity: Player,
  },
};

export default class LevelConfig {
  objects: Entity[] = [];

  decorations: Entity[] = [];

  planes: Sector[] = [];

  prepareList: (() => Promise<void>)[] = [];

  startList: Function[] = [];

  stopList: Function[] = [];

  constructor(level: LevelMap, game: Game) {
    // Парсер для текстовой карты уровня
    // Лучше вынести в отдельный метод
    level.forEach((row: string, rowIndex: number) => {
      if (!row.trim()) return;
      const cells = row.split('');
      cells.forEach((cell, cellIndex) => {
        // TODO: Придумать более элегантную проверку соответствия cell === EntitySign
        if (!cell.trim() || !checkList.includes(cell as EntitySign)) return;
        const object = levelDictironary[cell as EntitySign];
        if (!object) {
          throw new Error(
            `Нет такой сущности: ${cell}, ряд ${rowIndex}, ячейка ${cellIndex}`,
          );
        }

        const entity = new object.Entity(
          { x: cellIndex * CELL_SIDE, y: (rowIndex + 1) * CELL_SIDE },
          game,
        );

        this[object.role].push(entity);

        if (object.role === 'decorations' && entity.sector) {
          this.planes.push(entity.sector);
        }

        // TODO: Разобраться с типами ниже после типизации принмимаемых функций в Game
        if (entity.prepare) {
          game.prepareList.push(entity.prepare.bind(entity) as never);
        }
        if (entity.start) {
          game.startList.push(entity.start.bind(entity) as never);
        }
        if (entity.stop) {
          game.stopList.push(entity.stop.bind(entity) as never);
        }
      });
    });
  }
}
