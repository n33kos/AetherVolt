import BaseService  from 'services/BaseService';
import rectContains from 'lib/rectContains';
import Tile         from "classes/Tile";
import TileOutline  from "classes/TileOutline";
import TileType     from "classes/TileType";
import Vector2      from 'classes/Vector2';

export default class extends BaseService {
  findTileAtPosition(position) {
    // Search grid
    let clickedTile = this.getTileAtCanvasPosition(
      this.GameState.currentLevel.grid.tiles,
      position,
    );

    // Then search hand
    if (!clickedTile) {
      clickedTile = this.getTileAtCanvasPosition(
        this.GameState.currentLevel.attackingPlayer.hand.tiles,
        position,
      );
    }

    return clickedTile;
  }

  getTileWithPlayer(player) {
    return this.GameState.currentLevel.grid.tiles.find(tile => {
      return tile.player && tile.player.uuid === player.uuid;
    });
  }

  getTileAtCanvasPosition(tiles, position) {
    return tiles.find(tile => {
      return rectContains(
        position,
        new Vector2(
          tile.canvasPosition.x + tile.absoluteOffset.x,
          tile.canvasPosition.y + tile.absoluteOffset.y,
        ),
        new Vector2(
          tile.dimensions.x * tile.scale.x,
          tile.dimensions.y * tile.scale.y,
        ),
      );
    });
  }

  pushTilesDown() {
    const newTiles = [];

    // Move existing tiles
    this.GameState.currentLevel.grid.tiles.forEach(tile => {
      if (tile.tileType.type !== "PLAYER_COLUMN") {
        // Replace tile with empty if at the top
        if (tile.y === 0) {
          const randomTileTypes = [
            'EMPTY',
            // 'STRAIGHT',
            // 'BEND',
            // 'TRIPLE',
            'QUAD',
          ];
          const newTile = new Tile({
            GameState: this.GameState,
            dimensions: new Vector2(64, 64),
            grid: this.GameState.currentLevel.grid,
            offset: new Vector2(0.5, 0.5),
            scale: new Vector2(
              this.GameState.currentLevel.grid.cellSize / 64,
              this.GameState.currentLevel.grid.cellSize / 64
            ),
            id: `${tile.x}_0`,
            x: tile.x,
            y: 0,
            type: new TileType(randomTileTypes[Math.floor(Math.random()*randomTileTypes.length)]),
            outline: new TileOutline({ GameState: this.GameState }),
            // TODO: Replace this placedBy with something generic for auto generated tiles
            placedBy: tile.placedBy || this.GameState.currentLevel.attackingPlayer,
          });
          
          newTile.targetPosition = newTile.getCanvasPosition(
            this.GameState.currentLevel.grid.cellSize,
            this.GameState.currentLevel.grid.padding
          );

          newTile.canvasPosition = new Vector2(newTile.targetPosition.x, -64);

          // Set outline values
          newTile.outline.canvasPosition = newTile.targetPosition;
          newTile.outline.scale = newTile.scale;
          newTile.outline.dimensions = newTile.dimensions;

          newTiles.push(newTile);
        }

        // Move the tile down
        tile.y += 1;
        tile.id = `${tile.x}_${tile.y}`;
        tile.targetPosition = tile.getCanvasPosition(
          this.GameState.currentLevel.grid.cellSize,
          this.GameState.currentLevel.grid.padding
        );

        // If we move a tile off the bottom, dismiss it, then destroy it.
        if (tile.y >= this.GameState.currentLevel.grid.rows) {
          tile.emptyTile();
          tile.destroy();
        }
      }
    });

    // Add new tiles from top, must do this outside of the first loop
    // because we cant modify the array in place and keep the neighbor calculations correct
    newTiles.forEach(newTile => {
      this.GameState.currentLevel.grid.addTile(newTile);
    });

    // cant init until grid is fully modified
    this.GameState.currentLevel.grid.tiles.forEach(tile => {
      tile.init();
    });
  }
}
