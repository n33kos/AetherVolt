import Sprite  from 'classes/Sprite';

export default class extends Sprite {
  constructor(config) {
    config.animations = {
      exist : {
        frames        : 1,
        loop          : false,
        spriteSheet   : config.image,
        ticksPerFrame : 10,
      }
    };
    config.currentAnimation = 'exist';

    super(config);

    this.moveSpeed = 0.5;
    this.windowScale = window.innerWidth / this.dimensions.x;
    this.yPosition = this.getStartYPosition();
    this.canvasPosition.y = this.getStartYPosition();
    this.canvasPosition.x = 0;
  }

  draw() {
    this.windowScale = window.innerWidth / this.dimensions.x;
    this.scale.x = this.windowScale;
    this.scale.y = this.windowScale;

    this.handleMovement();
    super.draw();

    this.drawTilesAbove()
  }

  drawTilesAbove() {
    const tilesToDraw = Math.ceil(window.innerHeight / this.getWindowAdjustedHeight()) + 1;

    for (let i = 1; i <= tilesToDraw; i++) {
      // Abusing the draw system here by movind the canvas draw position and re-drawing the same tile
      this.GameState.Canvas.ctx.translate(0, -this.getWindowAdjustedHeight());
      super.draw();
    }
  }

  getWindowAdjustedHeight() {
    return this.dimensions.y * this.windowScale;
  }

  getStartYPosition() {
    return window.innerHeight - this.getWindowAdjustedHeight();
  }

  handleMovement() {
    let newY = this.yPosition + (this.moveSpeed * this.GameState.deltaTime);
    if (newY >= this.getStartYPosition() + this.getWindowAdjustedHeight()) newY = this.getStartYPosition();
    
    this.canvasPosition.y = newY;
    this.yPosition = newY;
  }
}
