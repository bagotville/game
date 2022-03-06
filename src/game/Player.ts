import Entity, { StartCoords } from './Entity';
import src from '../assets/images/player.svg';
import Game from './Game';

type PlayerMove = 'left' | 'right';

type PlayerStateMoves = {
  [K in PlayerMove]: boolean;
};

type KeyConfigurationItem = {
  keys: string[];
  action: PlayerMove;
};

type KeyConfiguration = KeyConfigurationItem[];

const keyConfig: KeyConfiguration = [
  {
    keys: ['ArrowLeft', 'a', 'A', 'ф', 'Ф'],
    action: 'left',
  },
  {
    keys: ['ArrowRight', 'd', 'D', 'в', 'В'],
    action: 'right',
  },
  // {
  //     keys: ['ArrowUp', 'w', 'W', 'ц', 'Ц', ' '],
  //     action: 'jump'
  // },
];

const settings = {
  src,
  speed: 5,
  factor: 10,
  width: 28,
  height: 36,
};

export default class Player extends Entity {
  constructor(coords: StartCoords, game: Game) {
    super(settings, coords, game);
  }

  actions: PlayerMove[] = [];

  moveState: PlayerStateMoves = new Proxy(
    {
      left: false,
      right: false,
    },
    {
      set: (target: PlayerStateMoves, prop: PlayerMove, value: boolean) => {
        target[prop] = value;
        if (value) {
          this.startMove(prop);
        } else {
          this.stopMove(prop);
        }
        return true;
      },
    },
  );

  keydownHandler = (evt: KeyboardEvent) => {
    const { key } = evt;
    const action = keyConfig.find((item) => item.keys.includes(key))?.action;
    if (!action) return;
    if (this.moveState[action]) return;
    this.actions.push(action);
    this.moveState[action] = true;
    const keyupHandler = (evt: KeyboardEvent) => {
      const upKey = evt.key;
      if (key === upKey) {
        this.moveState[action] = false;
        document.removeEventListener('keyup', keyupHandler);
      }
    };
    document.addEventListener('keyup', keyupHandler);
  };

  start() {
    document.addEventListener('keydown', this.keydownHandler);
  }

  stop() {
    document.removeEventListener('keydown', this.keydownHandler);
  }
}
