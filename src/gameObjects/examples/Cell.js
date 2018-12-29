import Sprite  from 'class/Sprite';
import Vector2 from 'class/Vector2';

export default class extends Sprite {
  constructor(config) {
    super(config);

    const {
      x,
      y,
      id,
    } = config;

    this.x = x;
    this.y = y;
    this.id = id;

    this.neighborPattern = [];
    if (Math.random() > 0.25) this.neighborPattern.push(0);
    if (Math.random() > 0.25) this.neighborPattern.push(1);
    if (Math.random() > 0.25) this.neighborPattern.push(2);
    if (Math.random() > 0.25) this.neighborPattern.push(3);
  }

  init(grid) {
    this.grid = grid;
    this.neighbors = this.getNeighbors();
  }

  getNeighbors() {
    const neighbors = [];

    if (this.neighborPattern.includes(0)) {
      neighbors.push(this.grid.find(cell => cell.id == `${this.x - 1}_${this.y}`));
    }
    if (this.neighborPattern.includes(1)) {
      neighbors.push(this.grid.find(cell => cell.id == `${this.x}_${this.y - 1}`));
    }
    if (this.neighborPattern.includes(2)) {
      neighbors.push(this.grid.find(cell => cell.id == `${this.x + 1}_${this.y}`));
    }
    if (this.neighborPattern.includes(3)) {
      neighbors.push(this.grid.find(cell => cell.id == `${this.x}_${this.y + 1}`));
    }

    return neighbors;
  }

  update() {
  }

  rotateCell(direction) {
    this.neighborPattern = this.neighborPattern.map(id => {
      id += direction;
      if (id < 0) id = 3;
      if (id > 3) id = 0;
      return id;
    });
    this.neighbors = this.getNeighbors();
  }

  draw() {
    super.draw();
    this.drawOutline();
    this.drawPathways();
  }

  drawOutline() {
    this.GameState.Canvas.ctx.beginPath();
    this.GameState.Canvas.ctx.lineWidth = 1 * window.devicePixelRatio;
    this.GameState.Canvas.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    this.GameState.Canvas.ctx.rect(
      0,
      0,
      this.dimensions.x * this.scale.x,
      this.dimensions.y * this.scale.y,
    );
    this.GameState.Canvas.ctx.stroke();
  }

  drawPathways() {
    this.GameState.Canvas.ctx.beginPath();
    this.GameState.Canvas.ctx.lineWidth = 3 * window.devicePixelRatio;
    this.GameState.Canvas.ctx.strokeStyle = 'rgba(35, 123, 220, 0.75)';

    this.neighborPattern.forEach(directionId => {
      const halfWidth = (this.dimensions.x / 2) * this.scale.x;
      const start = new Vector2(
        this.position.x + halfWidth,
        this.position.y + halfWidth,
      );
      const destination = new Vector2(
        this.position.x + halfWidth,
        this.position.y + halfWidth,
      );
      if (directionId === 0) destination.x -= halfWidth;
      if (directionId === 1) destination.y -= halfWidth;
      if (directionId === 2) destination.x += halfWidth;
      if (directionId === 3) destination.y += halfWidth;


      this.GameState.Canvas.ctx.moveTo(start.x, start.y);
      this.GameState.Canvas.ctx.lineTo(destination.x, destination.y);
    });
    
    this.GameState.Canvas.ctx.stroke();
  }
}
