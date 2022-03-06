import LevelConfig from './LevelConfig';
import Decorations from './Decorations';
import Entity from './Entity';
import { LevelMap } from './global';

export default class Game {
  prepareList = [];

  startList = [];

  stopList = [];

  container: HTMLElement | null;

  height: number;

  width: number;

  ctx: CanvasRenderingContext2D;

  levelMap: LevelMap;

  level: LevelConfig;

  decorations: Decorations;

  // TODO: Реинит холста при ресайзе

  constructor(selector: 'string', levelMap: LevelMap) {
    this.container = document.querySelector(selector);
    if (!this.container) {
      throw new Error(`Не найден элемент с селектором ${selector}`);
    }
    this.height = this.container.clientHeight;
    this.width = this.container.clientWidth;

    const canvas = document.createElement('canvas');
    canvas.className = 'objects';
    canvas.width = this.width;
    canvas.height = this.height;
    this.container.appendChild(canvas);
    // TODO: Со временем убрать оператор !
    this.ctx = canvas.getContext('2d')!;
    this.levelMap = levelMap;
    this.level = new LevelConfig(levelMap, this);
    this.decorations = new Decorations(this);
  }

  render() {
    const { ctx, level, height, width } = this;
    // Удаление всех отрисованных на странице элементов.
    ctx.clearRect(0, 0, width, height);

    level.objects.forEach((object: Entity) => {
      const { sprite, x, y } = object.props;
      if (!sprite) {
        // TODO: Более информативные ошибки
        throw new Error('Нет спрайта');
      }
      ctx.drawImage(sprite, x, y, sprite.width, -sprite.height);
    });
  }

  // Сброс координат всех объектов к начальному состоянию
  reset() {
    this.level = new LevelConfig(this.levelMap, this);
  }

  prepare() {
    return Promise.all(this.prepareList.map((func: Function) => func()));
  }

  start() {
    // TODO: Типизировать принимаемые функции
    this.startList.forEach((func: Function) => func());
    this.decorations.render();
    this.render();
  }

  async init() {
    await this.prepare();
    this.start();
  }

  stop() {
    // TODO: Типизировать принимаемые функции
    this.stopList.forEach((func: Function) => func());
    return true;
  }
}
