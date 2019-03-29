import SpriteButton          from 'classes/SpriteButton';
import Vector2               from 'classes/Vector2';

export default class extends SpriteButton {
  constructor(config) {
    super(config);

    const {
      sprite,
      targetPosition = null,
      playerName,
    } = config;

    this.targetPosition = targetPosition;
    this.canvasPosition = targetPosition;
    this.playerName = playerName;

    this.turbulence = new Vector2(0, 0);
    this.turbulenceStep = Math.random() * Math.PI * 2;
    this.turbulenceSpeed = 0.05;
    this.turbulenceRange = new Vector2(1, 15);
  }

  draw() {
    this.handleTurbulence();
    super.draw();
  }

  handleTurbulence() {
    if(!this.targetPosition) return;

    this.addTurbulence();

    const positionDiff = new Vector2(
      this.targetPosition.x - this.canvasPosition.x - this.turbulence.x,
      this.targetPosition.y - this.canvasPosition.y - this.turbulence.y,
    );
    this.canvasPosition = new Vector2(
      this.canvasPosition.x + positionDiff.x * 0.005 * this.GameState.deltaTime,
      this.canvasPosition.y + positionDiff.y * 0.005 * this.GameState.deltaTime,
    )
    this.calculateOffset();
  }

  addTurbulence() {
    this.turbulenceStep += this.turbulenceSpeed;
    if (this.turbulenceStep >= Math.PI*2) this.turbulenceStep = 0;

    this.turbulence = new Vector2(
      Math.cos(this.turbulenceStep) * this.turbulenceRange.x,
      Math.sin(this.turbulenceStep) * this.turbulenceRange.y,
    );
  }

  takeDamageAnimation(color) {
    this.currentAnimation = 'damage';

    window.setTimeout(() => {
      this.currentAnimation = 'mouseUp';
    }, 750);
  }
}
