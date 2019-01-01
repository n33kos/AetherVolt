import Sprite  from 'class/Sprite';
import Vector2 from 'class/Vector2';

export default class extends Sprite {
  constructor(config) {
    super(config);

    const {
      x,
      y,
      id,
      type,
      player, // Player object for avatar in this cell
      isInHand = false,
      dragPosition = null,
    } = config;

    this.x = x;
    this.y = y;
    this.id = id;
    this.tileType = type;
    this.player = player;
    this.isInHand = isInHand;
    this.dragPosition = dragPosition;
    this.targetRotation = 0;

    this.animations = {
      exist: {
        frames        : 1,
        spriteSheet   : './img/Pipes_Empty.png',
        ticksPerFrame : 5,
        loop          : false,
      },
    };
    this.currentAnimation = 'exist';
    this.neighborPattern = [];
    this.isHovered = false;
    this.placedBy = false;

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

  draw() {
    this.handleRotation()
    super.draw();
    this.drawOutline();
  }

  setOutlineColor() {
    this.GameState.Canvas.ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    if (this.tileType.type === 'PLAYER_COLUMN') this.GameState.Canvas.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
    // if (this.isHovered || this.isInHand) {
    //   this.GameState.Canvas.ctx.strokeStyle = this.GameState.currentLevel.players[
    //     this.GameState.currentLevel.currentPlayerTurn
    //   ].color;
    // }
    // if (this.placedBy) this.GameState.Canvas.ctx.strokeStyle = this.placedBy.color;
  }

  drawOutline() {
    this.GameState.Canvas.ctx.beginPath();
    this.GameState.Canvas.ctx.lineWidth = 1 * window.devicePixelRatio;
    this.setOutlineColor();
    this.GameState.Canvas.ctx.rect(
      0,
      0,
      this.dimensions.x * this.scale.x,
      this.dimensions.y * this.scale.y,
    );
    this.GameState.Canvas.ctx.stroke();
  }
}
