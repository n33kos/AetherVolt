import SpriteButton from 'class/SpriteButton';
import Vector2      from 'class/Vector2';

export default class extends SpriteButton {
  constructor(config) {
    super(config);

    const {
      sprite,
      targetPosition = null,
    } = config;

    this.targetPosition = targetPosition;
    this.canvasPosition = targetPosition;
  }

  draw() {
    this.handleTurbulence();
    super.draw();
  }

  takeDamageAnimation() {
    this.currentAnimation = 'damage';
    window.setTimeout(() => {
      this.currentAnimation = 'mouseUp';
    }, 750);
  }
}
