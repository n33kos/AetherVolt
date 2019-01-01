/*
  Override this class to create game entities.
  Draw canvas calls at position 0,0 as position, rotation, and offset will be applied automagically
*/
import LoadedEntity       from 'class/LoadedEntity';
import Vector2            from 'class/Vector2';
import worldSpaceToCanvas from 'lib/worldSpaceToCanvas';

export default class extends LoadedEntity {
  constructor(config) {
    super(config);

    const {
      dimensions = new Vector2(100, 100),
      offset = new Vector2(0.5, 0.5),
      position = new Vector2(),
      rotation = 0,
      alpha = 1,
    } = config;

    this.absoluteOffset = new Vector2();
    this.audioNodes = [];
    this.canvasPosition = new Vector2();
    this.controlCallbackIds = [];
    this.dimensions = dimensions;
    this.GameState = GameState;
    this.offset = offset;
    this.position = position;
    this.rotation = rotation;
    this.isVisible = true;
    this.alpha = alpha;

    this.turbulenceSpeed = 0.05;
    this.turbulence = new Vector2(0, 0);
    this.turbulenceRange = new Vector2(1, 15);
    this.turbulenceStep = Math.random() * Math.PI * 2;

    this.setPosition(position);
  }

  // Remember: use setPosition instead of directly setting position var.
  setPosition(position) {
    this.position = position;
    this.canvasPosition = worldSpaceToCanvas(this.GameState, this.position);
    this.calculateOffset();
  }

  calculateOffset() {
    this.absoluteOffset = new Vector2(
      -(this.offset.x * this.dimensions.x),
      -(this.offset.y * this.dimensions.y),
    );
  }

  drawEntity() {
    if (!this.isVisible) return;

    // Move canvas, rotate, then add offset.
    this.GameState.Canvas.ctx.translate(this.canvasPosition.x, this.canvasPosition.y);
    this.GameState.Canvas.ctx.rotate(this.rotation % (Math.PI * 2));
    this.GameState.Canvas.ctx.translate(this.absoluteOffset.x, this.absoluteOffset.y);
    this.GameState.Canvas.ctx.globalAlpha = this.alpha;

    this.draw();

    // Reset transforms
    this.GameState.Canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.GameState.Canvas.ctx.globalAlpha = 1;
  }

  update() {
    // Override this function for the entity's update loop
  }

  draw() {
    // Override this function for the entity's draw loop
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
}
