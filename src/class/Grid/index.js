import LoadedEntity from 'class/LoadedEntity';
import randomRange  from 'lib/randomRange';
import Tile         from 'class/Tile';
import TileType     from 'class/TileType';
import Vector2      from 'class/Vector2';

export default class extends LoadedEntity{
  constructor(config) {
    super(config);

    const {
      GameState,
      rows = 6,
      columns = 6,
      minimumPadding = 50,
      players,
    } = config;

    this.rows = rows;
    this.columns = columns + 2; // add 2 empty columns for player position
    this.maxRowsOrColumns = Math.max(this.rows, this.columns);
    this.minimumPadding = minimumPadding;
    this.grid = [];
    this.players = players;

    this.addControlsCallback('mouseUp', this.handleClick.bind(this));
    this.addControlsCallback('mouseMove', this.handleMouseMove.bind(this));
  }

  init() {
    // Calculations
    this.minDimension = Math.min(
      this.GameState.Canvas.width,
      this.GameState.Canvas.height,
    );
    this.cellSize = (this.minDimension - this.minimumPadding) / this.maxRowsOrColumns;
    this.padding = new Vector2(
      (this.GameState.Canvas.width - this.cellSize * this.columns) / 2,
      (this.GameState.Canvas.height - this.cellSize * this.rows) / 2,
    );

    // Build grid
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        let type = new TileType('EMPTY');
        if (x === 0 || x === this.columns - 1) type = new TileType('PLAYER_COLUMN');

        let cellPlayer = null;
        this.players.forEach(player => {
          if (player.avatar.x === x && player.avatar.y === y){
            cellPlayer = player;
          }
        });

        this.addCell(x, y, type, cellPlayer);
      }
    }

    // Init cells
    this.grid.forEach(cell => {
      cell.init(this.grid);
    });

    //Position and init Avatars
    this.players.forEach(player => {
      this.setAvatarPosition(player.avatar, player.avatar.x, player.avatar.y);
      this.GameState.Scene.add(player.avatar);
    });
  }

  setAvatarPosition(avatar, x, y) {
    avatar.canvasPosition = new Vector2(
      (x * this.cellSize) + this.padding.x + (this.cellSize/2),
      (y * this.cellSize) + this.padding.y + (this.cellSize/2),
    );
    avatar.calculateOffset();
  }

  addCell(x, y, type, cellPlayer) {
    const cell = new Tile({
      GameState: this.GameState,
      dimensions: new Vector2(64, 64),
      offset: new Vector2(0.5, 0.5),
      player: cellPlayer,
      scale: new Vector2(this.cellSize / 64, this.cellSize / 64),
      id: `${x}_${y}`,
      x,
      y,
      type,
    });
    cell.canvasPosition = new Vector2(
      (x * this.cellSize) + this.padding.x + (this.cellSize/2),
      (y * this.cellSize) + this.padding.y + (this.cellSize/2),
    );

    this.GameState.Scene.add(cell);
    this.grid.push(cell);
  }

  handleClick(e) {
    const clickedCell = this.getCellAtCanvasPosition(this.GameState.Controls.lastPosition);
    if (clickedCell) {
      clickedCell.setType(new TileType('BEND'));
      clickedCell.rotateCell(1);
    }
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
