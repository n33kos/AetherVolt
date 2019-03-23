import Entity          from 'classes/Entity';
import getPixelDensity from 'lib/getPixelDensity';
import Vector2         from 'classes/Vector2';

export default class extends Entity {
  constructor(config) {
    super(config);

    const {
      scale = new Vector2(1, 1),
    } = config;

    this.color = '#fff';
    this.lineWidth = getPixelDensity();
    this.scale = scale;

    this.calculateOffset();
  }

  draw() {
    this.GameState.Canvas.ctx.beginPath();
    this.GameState.Canvas.ctx.lineWidth = this.lineWidth;
    this.GameState.Canvas.ctx.strokeStyle = this.color;
    this.GameState.Canvas.ctx.rect(
      0,
      0,
      this.dimensions.x * this.scale.x,
      this.dimensions.y * this.scale.y,
    );
    this.GameState.Canvas.ctx.stroke();
  }

  calculateOffset() {
    if (!this.scale) return;
    this.absoluteOffset = new Vector2(
      -(this.offset.x * this.dimensions.x * this.scale.x),
      -(this.offset.y * this.dimensions.y * this.scale.y),
    );
  }
}
