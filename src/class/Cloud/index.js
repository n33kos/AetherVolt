import Sprite  from 'class/Sprite';
import Vector2 from 'class/Vector2';

export default class extends Sprite {
  constructor(config) {
    config.animations = {
      exist : {
        frames        : 1,
        loop          : false,
        spriteSheet   : './img/cloud_1.png',
        ticksPerFrame : 10,
      },
    };
    config.currentAnimation = 'exist';

    super(config);

    const {
      sprite,
      targetPosition = null,
    } = config;

    this.targetPosition = targetPosition;
    this.canvasPosition = targetPosition;
    this.moveSpeed = 5 + Math.floor(Math.random() * 5);
  }

  handleMovement() {
    let newY = this.canvasPosition.y + (this.moveSpeed * this.GameState.deltaTime);
    if (newY >= (this.GameState.Canvas.height * 2)) {
      this.canvasPosition = new Vector2(
        Math.random() * this.GameState.Canvas.width,
        -this.GameState.Canvas.cy,
      );
    } else {
      this.canvasPosition.y = newY;
    }
  }

  drawEntity() {
    this.handleMovement();
    super.drawEntity();
  }

  takeDamageAnimation() {
    this.currentAnimation = 'damage';
    window.setTimeout(() => {
      this.currentAnimation = 'mouseUp';
    }, 750);
  }
}