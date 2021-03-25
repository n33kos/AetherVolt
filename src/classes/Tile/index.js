import DismissedTile from 'classes/DismissedTile';
import Sprite        from 'classes/Sprite';
import TileType      from 'classes/TileType';
import Vector2       from 'classes/Vector2';
import uuidv4        from 'uuid/v4';

export default class extends Sprite {
  constructor(config) {
    super(config);

    const {
      x,
      y,
      id,
      type,
      player, // Player object for avatar currently in this cell (usually only applies to empty cells in player columns)
      placedBy, // Player object of player who placed the tile
      scale,
      isInHand = false,
      dragPosition = null,
      grid,
      targetPosition = null,
      outline = null,
      maxHealth = 2,
      health = 2,
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
    this.maxHealth = maxHealth;
    this.health = health;
    this.placedBy = placedBy;
    this.grid = grid;

    this.init();
  }

  setType(type) {
    this.tileType = type;
    this.animations.exist.spriteSheet = this.getSpriteSheet();
    this.neighborPattern = type.neighborPattern;
    this.load();
  }

  init() {
    this.animations = {
      exist: {
        frames: 5,
        spriteSheet: this.getSpriteSheet(),
        ticksPerFrame: 1,
        loop: true,
      },
    };
    this.setType(this.tileType);
    this.neighbors = this.getNeighbors();
    this.currentAnimation = 'exist';
    this.isHovered = false;

    this.turbulence = new Vector2(0, 0);
    this.turbulenceStep = Math.random() * Math.PI * 2;
    this.turbulenceSpeed = 0.02;
    this.turbulenceRange = new Vector2(15, 15);
    this.uuid = uuidv4();

    this.calculateOffset();
  }

  getSpriteSheet() {
    //OVERRIDE FOR TESTING ALL QUAD MODE
    return this.tileType.id === 1 || this.tileType.id === 2  ? '' : './img/orb.png';

    // return this.placedBy ? this.placedBy.tiles[this.tileType.id] : '';
  }

  getNeighbors() {
    const neighbors = [];
    if (!this.grid || !this.grid.tiles) return [];

    if (this.neighborPattern.includes(0)) {
      neighbors.push(this.grid.tiles.find(cell => cell.id == `${this.x + 1}_${this.y}`));
    }
    if (this.neighborPattern.includes(1)) {
      neighbors.push(this.grid.tiles.find(cell => cell.id == `${this.x}_${this.y + 1}`));
    }
    if (this.neighborPattern.includes(2)) {
      neighbors.push(this.grid.tiles.find(cell => cell.id == `${this.x - 1}_${this.y}`));
    }
    if (this.neighborPattern.includes(3)) {
      neighbors.push(this.grid.tiles.find(cell => cell.id == `${this.x}_${this.y - 1}`));
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
      this.outline.color = this.getOutlineColor();
      this.outline.drawEntity();
    }
    super.drawEntity();
  }

  draw() {
    if (!this.isInHand) this.handleTurbulence();
    this.handleRotation();

    super.draw();
  }

  getOutlineColor() {
    if (this.tileType.type === 'PLAYER_COLUMN') return 'rgba(0, 0, 0, 0)';
    return '#fff';
    if (this.placedBy) return `rgb(${this.placedBy.color}, 0.2`;
    if (this.isHovered && this.GameState.currentLevel.tileHelper.isDragging) return 'rgba(0, 0, 0, 0.2)';
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

    this.calculateOffset();
  }

  addTurbulence() {
    this.turbulenceStep += this.turbulenceSpeed;
    if (this.turbulenceStep >= Math.PI * 2) this.turbulenceStep = 0;

    this.turbulence = new Vector2(
      Math.cos(this.turbulenceStep) * (Math.random() * this.turbulenceRange.x),
      Math.sin(this.turbulenceStep) * (Math.random() * this.turbulenceRange.y),
    );
  }

  emptyTile() {
    this.createDismissedTile();
    this.setType(new TileType('EMPTY'));
    this.player = false;
    this.placedBy = false;
    this.init(this.grid);
  }

  createDismissedTile() {
    // Add dismissed tile (floats away, may call this "destroyed tile" at some point)
    const dismissedTile = new DismissedTile({
      sprite         : this.animations.exist.spriteSheet,
      canvasPosition : this.canvasPosition,
      dimensions     : this.dimensions,
      GameState      : this.GameState,
      offset         : this.offset,
      scale          : this.scale,
    });
    this.GameState.Scene.add(dismissedTile);
  }

  takeDamage(damage) {
    this.health -= damage;
    if (this.tileType.type !== 'PLAYER_COLUMN' && this.health <= 0) {
      this.emptyTile();
    }
  }

  getCanvasPosition(cellSize, padding) {
    return new Vector2(
      (this.x * cellSize) + padding.x + (cellSize/2),
      (this.y * cellSize) + padding.y + (cellSize/2),
    );
  }

  destroy() {
    // Remove from tile list
    this.GameState.currentLevel.grid.tiles = this.GameState.currentLevel.grid.tiles.filter(tile => tile.uuid !== this.uuid);

    //Remove from scene
    this.GameState.Scene.remove(this.uuid);
  }
}
