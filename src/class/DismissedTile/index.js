import Sprite  from 'class/Sprite';
import Vector2 from 'class/Vector2';

export default class extends Sprite {
  constructor(config) {
    config.currentAnimation = 'exist';

    super(config);

    // TODO: This isn't rendering, figure out why, its probably something small and obvious

    this.canvasPosition = config.canvasPosition;
    this.targetPosition = new Vector2(
      config.canvasPosition.x,
      this.GameState.Canvas.height * 1.5,
    );
    this.moveSpeed = 0.005;
  }

  handleMovement() {
    //let newY = this.canvasPosition.y + (this.moveSpeed * this.GameState.deltaTime);
    //this.canvasPosition.y = newY;
    //if (newY >= this.GameState.Canvas.height * 1.5) this.destroySelf();
  }

  destroySelf() {
    this.GameState.Scene.remove(this.uuid);
  }

  drawEntity() {
    this.handleMovement();
    super.drawEntity();
  }
}
