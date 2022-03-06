import Game from './Game';
import { CELL_SIDE } from './global';

/* 

Decorations — специальный класс для обработки и рендеринга отдельного слоя декораций.
Формирует отдельный холст поверх холста с объектами, хотя надо наоборот.

 */

export default class Decorations {
  ctx: CanvasRenderingContext2D;

  parent: Game;

  constructor(parent: Game) {
    const canvas = document.createElement('canvas');
    canvas.className = 'decorations';
    canvas.width = parent.width;
    canvas.height = parent.height;
    // TODO: Со временем убрать операторы !
    parent.container!.appendChild(canvas);
    this.ctx = canvas.getContext('2d')!;
    this.parent = parent;
  }

  // TODO: Дублирование кода. Универсализировать метод render
  render() {
    const { level, height, width } = this.parent;
    const { ctx } = this;
    ctx.clearRect(0, 0, width, height);

    level.decorations.forEach((object) => {
      const { sprite, x, y } = object.props;
      if (!sprite) {
        // TODO: Более информативные ошибки
        throw new Error('Нет спрайта');
      }
      ctx.drawImage(sprite, x, y, sprite.width, -sprite.height);
    });

    // TODO: Убрать код для формирования сетки когда будет не нужен

    for (let x = 0.5; x < width; x += CELL_SIDE) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }

    for (let y = 0.5; y < height; y += CELL_SIDE) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }

    ctx.strokeStyle = '#888';
    ctx.stroke();
  }
}
