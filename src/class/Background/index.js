import Sprite  from 'class/Sprite';
import Vector2 from 'class/Vector2';

export default class extends Sprite {
  constructor(config) {
    config.animations = {
      exist : {
        frames        : 1,
        loop          : false,
        spriteSheet   : './img/sky.png',
        ticksPerFrame : 10,
      }
    };
    config.currentAnimation = 'exist';

    super(config);

    this.moveSpeed = 0.2;
  }

  draw() {
    this.handleMovement();
    super.draw();
  }

  handleMovement() {
    let newY = this.canvasPosition.y + (this.moveSpeed * this.GameState.deltaTime);
    if (newY >= 0) newY = -this.GameState.Canvas.height;
    this.canvasPosition.y = newY;
  }
}
