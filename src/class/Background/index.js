import Entity  from 'class/Entity';
import Vector2 from 'class/Vector2';

export default class extends Entity {
  constructor(config) {
    super(config);

    const {
      imageUrl,
      repeat,
      scale = new Vector2(1, 1),
    } = config;

    this.imageUrl = imageUrl;
    this.repeat = repeat;
    this.scale = scale;

    this.moveSpeed = 0.35;
    this.pattern = null;
  }

  load() {
    const img = new Image();
    img.onload = () => {
      this.pattern = this.GameState.Canvas.ctx.createPattern(img, this.repeat);
    };
    img.src = this.imageUrl;
  }

  calculateOffset() {
    if (!this.scale) return;
    this.offset = new Vector2(
      -(this.origin.x * this.dimensions.x * this.scale.x),
      -(this.origin.y * this.dimensions.y * this.scale.y),
    );
  }

  draw() {
    this.handleMovement();
    this.GameState.Canvas.ctx.beginPath();
    this.GameState.Canvas.ctx.rect(
      0,
      0,
      this.dimensions.x * this.scale.x,
      this.dimensions.y * this.scale.y,
    );
    this.GameState.Canvas.ctx.fillStyle = this.pattern;
    this.GameState.Canvas.ctx.scale(this.scale.x, this.scale.y);
    this.GameState.Canvas.ctx.fill();
  }

  handleMovement() {
    let newY = this.canvasPosition.y + (this.moveSpeed * this.GameState.deltaTime);
    if (newY >= 0) newY = -this.GameState.Canvas.height;
    this.canvasPosition.y = newY;
  }
}
