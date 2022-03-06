import Game from './Game';

type EntityIntialSettings = {
  src: string;
  speed: number;
  factor: number;
  width: number;
  height: number;
};

export type StartCoords = {
  x: number;
  y: number;
};

type EntitySettings = {
  src: string;
  speed: number;
  factor: number;
};

type EntityProps = {
  width: number;
  height: number;
  sprite: HTMLImageElement | null;
  x: number;
  y: number;
};

export type Sector = {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
};

type Direction = 'right' | 'left' | 'down' | 'top';

type IntervalHandler = null | number;

type MoveState = {
  [K in Direction]: IntervalHandler;
};

type Axios = 'x' | 'y';

type MoveDictionary = {
  [K in Direction]: {
    axios: Axios;
    mod: number;
  };
};

export default class Entity {
  game: Game;

  // Неизменяемые параметры
  settings: EntitySettings = {
    src: '',
    speed: 0,
    factor: 0,
  };

  // Изменяемые параметры
  props: EntityProps = {
    width: 0,
    height: 0,
    sprite: null,
    x: 0,
    y: 0,
  };

  state: MoveState = {
    left: null,
    right: null,
    down: null,
    top: null,
  };

  dictionary: MoveDictionary = {
    right: { axios: 'x', mod: 1 },
    left: { axios: 'x', mod: -1 },
    down: { axios: 'y', mod: 1 },
    top: { axios: 'y', mod: -1 },
  };

  constructor(
    { src, speed, factor, width, height }: EntityIntialSettings,
    { x, y }: StartCoords,
    game: Game,
  ) {
    // TODO: Придумать лучшее решение для вывода лёгкого интерфейса для дочерних сущностей
    this.settings.factor = factor;
    this.settings.speed = speed;
    this.settings.src = src;
    this.props.width = width;
    this.props.height = height;
    this.props.x = x;
    this.props.y = y;
    this.game = game;
  }

  startMove(direction: Direction) {
    const { axios, mod } = this.dictionary[direction];
    const intervalId = setInterval(() => {
      /* 
            TODO: На этом месте должна быть обработка взаимодействий с объектами игры
            Именно до следующего передвижения
             */

      this.props[axios] += mod;

      /* 
            TODO: На этом месте должна быть обработка взаимодействий с поверхностями
            В случае, если расстояние до поверхности меньше шага сущности, надо пренебрегать таким расстоянием
            и перемещать сразу к поверхности
             */
    }, this.settings.factor);
    // TODO: Добавить тип Timeout
    this.state[direction] = intervalId as unknown as number;
  }

  stopMove(direction: Direction) {
    const intervalId = this.state[direction];
    // TODO: Исправить ситуацию с типом
    // eslint-disable-next-line no-undef
    clearInterval(intervalId!);
    this.state[direction] = null;
  }

  bindRenderToProps() {
    const makeProxy = (props: EntityProps, game: Game) => {
      const handler = {
        set: (
          target: EntityProps,
          prop: keyof EntityProps,
          value: number & HTMLImageElement,
        ) => {
          target[prop] = value;
          game.render();
          return true;
        },
      };
      return new Proxy(props, handler);
    };
    const { props, game } = this;
    this.props = makeProxy(props, game);
  }

  get isExisting() {
    // Проверка на то, что все координаты являются числами
    return Number.isFinite(this.props.x) && Number.isFinite(this.props.y);
  }

  get sector(): Sector | null {
    /* 
        Этот метод возвращает целочисленные координаты сектора, который занимает сущность.
        Нужно для удобного расчёта пересечений с другими сущностями
        */
    if (!this.isExisting) return null;
    const { x, y, height, width } = this.props;
    return {
      x1: Math.floor(x),
      x2: Math.ceil(x + width),
      y1: Math.floor(y - height),
      y2: Math.ceil(y),
    };
  }

  prepare() {
    this.bindRenderToProps();
    return new Promise<void>((resolve, reject) => {
      this.props.sprite = new Image(this.props.width, this.props.height);
      this.props.sprite.src = this.settings.src;
      this.props.sprite.onload = () => resolve();
      this.props.sprite.onerror = () => reject();
    });
  }
}
