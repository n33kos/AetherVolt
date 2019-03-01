import Sprite  from 'classes/Sprite';
import Vector2 from 'classes/Vector2';

export default class extends Sprite {
  constructor(config) {
    config.animations = {
      exist : {
        frames        : 1,
        loop          : false,
        spriteSheet   : config.sprite,
        ticksPerFrame : 10,
      },
    };
    config.currentAnimation = 'exist';

    super(config);

    this.canvasPosition = config.canvasPosition;
    this.targetPosition = new Vector2(
      config.canvasPosition.x,
      this.GameState.Canvas.height * 1.5,
    );
    this.moveSpeed = 2 + Math.random() * 3;
    this.calculateOffset();
  }

  handleMovement() {
    let newY = this.canvasPosition.y + (this.moveSpeed * this.GameState.deltaTime);
    this.canvasPosition.y = newY;
    if (newY >= this.GameState.Canvas.height * 1.5) this.destroySelf();

    this.rotation += 0.5 * this.GameState.deltaTime;
  }

  destroySelf() {
    this.GameState.Scene.remove(this.uuid);
  }

  drawEntity() {
    this.handleMovement();
    super.drawEntity();
  }
}
