import randomRange from 'lib/randomRange';
import Tile        from 'classes/Tile';
import TileOutline from 'classes/TileOutline';
import TileType    from 'classes/TileType';
import Vector2     from 'classes/Vector2';

export default class {
  constructor(config) {
    const {
      GameState,
      rows = 6,
      columns = 6,
      minimumPadding = 50,
      players,
    } = config;

    this.GameState = GameState;
    this.rows = rows;
    this.columns = columns + 2; // add 2 empty columns for player position
    this.maxRowsOrColumns = Math.max(this.rows, this.columns);
    this.minimumPadding = minimumPadding;
    this.tiles = [];
    this.players = players;
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

    // Build grid tiles
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        let type = new TileType('EMPTY');
        if (x === 0 || x === this.columns - 1) type = new TileType('PLAYER_COLUMN');
        this.addTile(x, y, type);
      }
    }

    // Init cells
    this.tiles.forEach(cell => {
      cell.init(this.tiles);
    });

    // Position avatars
    this.positionAvatars();
  }

  positionAvatars() {
    this.players.forEach((player, index) => {
      const tileID = `${index === 0 ? 0 : this.columns - 1}_${Math.floor(randomRange(0, this.rows - 1))}`;
      const tile = this.tiles.find(tile => tile.id === tileID);

      tile.player = player;
      player.setAvatarPosition(tile);
      this.GameState.Scene.add(player.avatar);
    });
  }

  addTile(x, y, type) {
    const cell = new Tile({
      GameState: this.GameState,
      dimensions: new Vector2(64, 64),
      offset: new Vector2(0.5, 0.5),
      scale: new Vector2(this.cellSize / 64, this.cellSize / 64),
      id: `${x}_${y}`,
      x,
      y,
      type,
      outline: new TileOutline({ GameState: this.GameState }),
    });
    cell.canvasPosition = new Vector2(
      (x * this.cellSize) + this.padding.x + (this.cellSize/2),
      (y * this.cellSize) + this.padding.y + (this.cellSize/2),
    );
    cell.targetPosition = cell.canvasPosition;

    // Set outline values
    cell.outline.canvasPosition = cell.targetPosition;
    cell.outline.scale = cell.scale;
    cell.outline.dimensions = cell.dimensions;

    this.GameState.Scene.add(cell);
    this.tiles.push(cell);
  }

  getTileAtCanvasPosition(position) {
    const x = Math.floor((position.x - this.padding.x) / this.cellSize);
    const y = Math.floor((position.y - this.padding.y) / this.cellSize);
    return this.tiles.find(cell => cell.id === `${x}_${y}`);
  }
}
