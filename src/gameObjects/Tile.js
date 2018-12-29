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
      player,
    } = config;

    this.x = x;
    this.y = y;
    this.id = id;
    this.type = type;
    this.player = player;

    this.animations = {
      exist: {
        frames        : 1,
        spriteSheet   : './img/Pipes_Empty.png',
        ticksPerFrame : 4,
      },
    };
    this.currentAnimation = 'exist';
    this.neighborPattern = [];

    this.setType(type);
    this.calculateOffset();
  }

  setType(type) {
    // make these types into constants or class or something
    if (type === 'playerColumn') {
      this.animations.exist.spriteSheet = './img/Pipes_Empty.png';
      this.neighborPattern = [0,2];
    }

    if (type === 'empty') {
      this.animations.exist.spriteSheet = './img/Pipes_Empty.png';
      this.neighborPattern = [];
    }

    if (type === 'straight') {
      this.animations.exist.spriteSheet = './img/Pipes_Straight.png';
      this.neighborPattern = [1,3];
    }

    if (type === 'bend') {
      this.animations.exist.spriteSheet = './img/Pipes_Bend.png';
      this.neighborPattern = [0,1];
    }

    if (type === 'triple') {
      this.animations.exist.spriteSheet = './img/Pipes_Triple.png';
      this.neighborPattern = [0,1,3];
    }

    if (type === 'quad') {
      this.animations.exist.spriteSheet = './img/Pipes_Quad.png';
      this.neighborPattern = [0,1,2,3];
    }

    this.load();
  }

  init(grid) {
    this.grid = grid;
    this.neighbors = this.getNeighbors();
  }

  getNeighbors() {
    const neighbors = [];

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

  update() {
  }

  rotateCell(direction) {
    let newRotation = this.rotation + Math.PI / (2 * direction);
    if (newRotation >= Math.PI * 2) newRotation = 0;
    if (newRotation < 0) newRotation = Math.PI * 1.5;
    this.rotation = newRotation;

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
  }

  drawOutline() {
    this.GameState.Canvas.ctx.beginPath();
    this.GameState.Canvas.ctx.lineWidth = 1 * window.devicePixelRatio;
    this.GameState.Canvas.ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
    if (this.type !== 'playerColumn') this.GameState.Canvas.ctx.strokeStyle = 'rgba(0, 0, 255, 0.3)';
    this.GameState.Canvas.ctx.rect(
      0,
      0,
      this.dimensions.x * this.scale.x,
      this.dimensions.y * this.scale.y,
    );
    this.GameState.Canvas.ctx.stroke();
  }
}
