import Cell        from 'gameObjects/examples/Cell';
import Level       from 'class/Level';
import randomRange from 'lib/randomRange';
import Vector2     from 'class/Vector2';

export default class extends Level {
  constructor(config) {
    super(config);

    this.name = "Grid";
  }

  load() {
    this.GameState.Scene.clear();

    this.grid = [];
    this.rows = 6;
    this.columns = 6;
    this.minDimension = Math.min(
      this.GameState.Canvas.width,
      this.GameState.Canvas.height,
    );
    this.minimumPadding = 100;
    this.cellSize = (this.minDimension - this.minimumPadding) / this.rows;
    this.padding = new Vector2(
      (this.GameState.Canvas.width - this.cellSize * this.rows) / 2,
      (this.GameState.Canvas.height - this.cellSize * this.columns) / 2,
    );
    this.hoveredCell = null;

    for (let y = 0; y < this.columns; y++) {
      for (let x = 0; x < this.rows; x++) {
        const cell = new Cell({
          GameState: this.GameState,
          offset: new Vector2(0, 0),
          dimensions: new Vector2(64, 64),
          animations: {
            exist: {
              frames        : 1,
              spriteSheet   : './img/examples/tile.png',
              ticksPerFrame : 4,
            },
          },
          scale: new Vector2(this.cellSize / 64, this.cellSize / 64),
          id: `${x}_${y}`,
          x: x,
          y: y,
        });
        cell.currentAnimation = 'exist';
        cell.canvasPosition = new Vector2(
          (x * this.cellSize) + this.padding.x,
          (y * this.cellSize) + this.padding.y,
        );

        this.GameState.Scene.add(cell);
        this.grid.push(cell);
      }
    }

    this.grid.forEach(cell => {
      cell.init(this.grid);
    });

    this.addControlsCallback('mouseUp', this.handleClick.bind(this));
    this.addControlsCallback('mouseMove', this.handleMouseMove.bind(this));
  }

  handleClick(e) {
    const clickedCell = this.getCellAtCanvasPosition(this.GameState.Controls.lastPosition);
    if (clickedCell) clickedCell.rotateCell(1);
  }

  handleMouseMove(e) {
    this.hoveredCell = this.getCellAtCanvasPosition(this.GameState.Controls.position);
    if (!this.hoveredCell) return;

    this.grid.forEach(cell => {
      cell.fillStyle = 'white';
      if (this.hoveredCell.id === cell.id) {
        cell.fillStyle = 'pink';
      }
    })
  }

  getCellAtCanvasPosition(position) {
    const x = Math.floor((position.x - this.padding.x) / this.cellSize);
    const y = Math.floor((position.y - this.padding.y) / this.cellSize);
    return this.grid.find(cell => cell.id === `${x}_${y}`);
  }
}
