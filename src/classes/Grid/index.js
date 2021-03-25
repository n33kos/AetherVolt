import { throttle } from 'throttle-debounce';

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

    window.addEventListener('resize', throttle(500, () => {
      this.init();
    }));
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

    if (this.tiles.length > 0) {
      this.resizeGridTiles();
    } else {
      this.buildGridTiles();
    }

    // Init cells
    this.tiles.forEach(cell => {
      cell.init(this.tiles);
    });

    // Position avatars
    this.positionAvatars();
  }

  resizeGridTiles() {
    this.tiles.forEach(tile => {
      tile.scale = new Vector2(this.cellSize / 64, this.cellSize / 64);

      tile.canvasPosition = tile.getCanvasPosition(this.cellSize, this.padding);
      tile.targetPosition = tile.canvasPosition;

      // Set outline values
      tile.outline.canvasPosition = tile.targetPosition;
      tile.outline.scale = tile.scale;
      tile.outline.dimensions = tile.dimensions;
    });
  }

  buildGridTiles() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        let type = new TileType('EMPTY');
        if (x === 0 || x === this.columns - 1) type = new TileType('PLAYER_COLUMN');

        const tile = new Tile({
          GameState: this.GameState,
          dimensions: new Vector2(64, 64),
          offset: new Vector2(0.5, 0.5),
          scale: new Vector2(this.cellSize / 64, this.cellSize / 64),
          id: `${x}_${y}`,
          x,
          y,
          type,
          grid: this,
          outline: new TileOutline({ GameState: this.GameState }),
        });

        tile.canvasPosition = tile.getCanvasPosition(this.cellSize, this.padding);
        tile.targetPosition = tile.canvasPosition;

        // Set outline values
        tile.outline.canvasPosition = tile.targetPosition;
        tile.outline.scale = tile.scale;
        tile.outline.dimensions = tile.dimensions;

        this.addTile(tile);
      }
    }
  }

  positionAvatars() {
    const playersInScene = this.GameState.Scene.find(gameObject => {
      return gameObject.isPlayerAvatar;
    });

    if (playersInScene.length) {
      this.tiles.forEach(tile => {
        if (tile.player) {
          tile.player.setAvatarPosition(tile);
        }
      });
    } else {
      this.players.forEach((player, index) => {
        const tileID = `${index === 0 ? 0 : this.columns - 1}_${Math.floor(randomRange(0, this.rows - 1))}`;
        const tile = this.tiles.find(tile => tile.id === tileID);

        tile.player = player;
        player.setAvatarPosition(tile);
        this.GameState.Scene.add(player.avatar);
      });
    }
  }

  addTile(tile) {
    this.GameState.Scene.add(tile);
    this.tiles.unshift(tile);
  }

  removeTile(tileToRemove) {
    this.tiles = this.tiles.filter(tile => tile.uuid !== tileToRemove.uuid)
  }
}
