import Entity  from 'class/Entity';
import Vector2 from 'class/Vector2';

export default class extends Entity {
  constructor(config) {
    super(config);

    const {
      color,
      velocity,
    } = config;

    this.color = color;
    this.velocity = velocity;
  }

  update() {
    this.rotation += 0.01 * this.GameState.deltaTime;

    this.velocity = new Vector2(
      this.velocity.x * 0.99,
      this.velocity.y * 0.99,
    );

    this.setPosition(
      new Vector2(
        this.position.x + this.velocity.x,
        this.position.y + this.velocity.y,
      )
    );

    this.boundingBox();
  }

  boundingBox() {
    if (
      this.position.x > this.GameState.Canvas.cx
      || this.position.x < -this.GameState.Canvas.cx
    ) this.velocity.x *= -1;
    if (
      this.position.y > this.GameState.Canvas.cy
      || this.position.y < -this.GameState.Canvas.cy
    ) this.velocity.y *= -1;
  }

  draw() {
    this.GameState.Canvas.ctx.beginPath();
    this.GameState.Canvas.ctx.fillStyle = this.color;
    this.GameState.Canvas.ctx.rect(0, 0, this.dimensions.x, this.dimensions.y);
    this.GameState.Canvas.ctx.fill();
  }
}
