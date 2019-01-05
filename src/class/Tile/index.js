import cloneClass    from 'lib/cloneClass';
import DismissedTile from 'class/DismissedTile';
import Sprite        from 'class/Sprite';
import TileType      from 'class/TileType';
import Vector2       from 'class/Vector2';

export default class extends Sprite {
  constructor(config) {
    super(config);

    const {
      x,
      y,
      id,
      type,
      player, // Player object for avatar in this cell
      scale,
      isInHand = false,
      dragPosition = null,
      targetPosition = null,
      outline = null,
    } = config;

    this.x = x;
    this.y = y;
    this.id = id;
    this.tileType = type;
    this.player = player;
    this.isInHand = isInHand;
    this.dragPosition = dragPosition;
    this.targetRotation = 0;
    this.targetPosition = targetPosition;
    this.canvasPosition = targetPosition;
    this.targetScale = scale;
    this.outline = outline;

    this.animations = {
      exist: {
        frames        : 5,
        spriteSheet   : './img/Pipes_Empty.png',
        ticksPerFrame : 1,
        loop          : true,
      },
    };
    this.currentAnimation = 'exist';
    this.neighborPattern = [];
    this.isHovered = false;
    this.placedBy = false;

    this.turbulence = new Vector2(0, 0);
    this.turbulenceStep = Math.random() * Math.PI * 2;
    this.turbulenceSpeed = 0.02;
    this.turbulenceRange = new Vector2(5, 5);
    this.turbulenceScale = 0;
    this.turbulenceScaleRange = 0.1;

    this.setType(type);
    this.calculateOffset();
  }

  setType(type) {
    this.tileType = type;
    this.animations.exist.spriteSheet = type.spriteSheet;
    this.neighborPattern = type.neighborPattern
    this.load();
  }

  init(grid) {
    this.grid = grid;
    this.neighbors = this.getNeighbors();
  }

  getNeighbors() {
    const neighbors = [];
    if (!this.grid) return [];

    if (this.neighborPattern.includes(0)) {
      neighbors.push(this.grid.find(cell => cell.id == `${this.x + 1}_${this.y}`));
    }
    if (this.neighborPattern.includes(1)) {
      neighbors.push(this.grid.find(cell => cell.id == `${this.x}_${this.y + 1}`));
    }
    if (this.neighborPattern.includes(2)) {
      neighbors.push(this.grid.find(cell => cell.id == `${this.x - 1}_${this.y}`));
    }
    if (this.neighborPattern.includes(3)) {
      neighbors.push(this.grid.find(cell => cell.id == `${this.x}_${this.y - 1}`));
    }

    return neighbors;
  }

  rotateCell(direction) {
    let newRotation = this.targetRotation + (Math.PI / 2 * direction);
    this.targetRotation = newRotation;

    this.neighborPattern = this.neighborPattern.map(id => {
      id += direction;
      if (id < 0) id = 3;
      if (id > 3) id = 0;
      return id;
    });

    this.neighbors = this.getNeighbors();
  }

  handleRotation() {
    const rotationDiff = this.targetRotation - this.rotation;
    this.rotation += rotationDiff * 0.01 * this.GameState.deltaTime;
  }

  drawEntity() {
    if (this.outline) {
      this.outline.canvasPosition = this.targetPosition;
      this.outline.calculateOffset();
      this.setOutlineColor();
      this.outline.drawEntity();
    }
    super.drawEntity();
  }

  draw() {
    if (!this.isInHand) this.handleTurbulence();
    this.handleRotation();

    super.draw();
  }

  setOutlineColor() {
    this.GameState.Canvas.ctx.strokeStyle = 'rgba(0, 0, 0, 0.05)';
    if (this.tileType.type === 'PLAYER_COLUMN') this.GameState.Canvas.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
    // if (this.placedBy) this.GameState.Canvas.ctx.strokeStyle = `rgb(${this.placedBy.color}, 0.2`;
    if (this.isHovered && this.GameState.currentLevel.tileHelper.isDragging) {
      this.GameState.Canvas.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
    }
  }

  handleTurbulence() {
    if(!this.targetPosition) return;

    this.addTurbulence();

    // Set position away from target to cause correction
    const positionDiff = new Vector2(
      this.targetPosition.x - this.canvasPosition.x - this.turbulence.x,
      this.targetPosition.y - this.canvasPosition.y - this.turbulence.y,
    );
    this.canvasPosition = new Vector2(
      this.canvasPosition.x + positionDiff.x * 0.005 * this.GameState.deltaTime,
      this.canvasPosition.y + positionDiff.y * 0.005 * this.GameState.deltaTime,
    )

    // Set scale away from target to cause correction
    const scaleDiff = this.targetScale.x - this.scale.x - this.turbulenceScale;
    this.scale = new Vector2(
      this.scale.x + scaleDiff * 0.01 * this.GameState.deltaTime,
      this.scale.x + scaleDiff * 0.01 * this.GameState.deltaTime,
    );

    this.calculateOffset();
  }

  addTurbulence() {
    this.turbulenceStep += this.turbulenceSpeed;
    if (this.turbulenceStep >= Math.PI * 2) this.turbulenceStep = 0;

    this.turbulence = new Vector2(
      Math.cos(this.turbulenceStep) * this.turbulenceRange.x,
      Math.sin(this.turbulenceStep) * this.turbulenceRange.y,
    );
    this.turbulenceScale = Math.cos(this.turbulenceStep) * this.turbulenceScaleRange;
  }

  emptyTile() {
    const dismissedTile = new DismissedTile({
      sprite         : this.animations.exist.spriteSheet,
      canvasPosition : this.canvasPosition,
      dimensions     : this.dimensions,
      GameState      : this.GameState,
      offset         : this.offset,
      scale          : this.scale,
    });
    this.GameState.Scene.add(dismissedTile);

    this.setType(new TileType('EMPTY'));
    this.placedBy = false;
    this.init(this.grid);
  }
}
