import BaseService  from 'services/BaseService';
import rectContains from 'lib/rectContains';
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
    // Move existing tiles
    this.GameState.currentLevel.grid.tiles.forEach(tile => {
      if (tile.tileType.type !== "PLAYER_COLUMN") {
        // Move the tile down
        tile.y += 1;
        tile.id = `${tile.x}_${tile.y}`;
        tile.targetPosition = tile.getCanvasPosition(
          this.GameState.currentLevel.grid.cellSize,
          this.GameState.currentLevel.grid.padding
        );

        // Replace tile with empty if at the top
        if (tile.y === 1) {
          // GET THIS TO RANDOMIZE, IT DOESNT WORK WITH NON_EMPTY TILES RIGHT NOW
          // GET THIS TO RANDOMIZE, IT DOESNT WORK WITH NON_EMPTY TILES RIGHT NOW
          // GET THIS TO RANDOMIZE, IT DOESNT WORK WITH NON_EMPTY TILES RIGHT NOW
          // GET THIS TO RANDOMIZE, IT DOESNT WORK WITH NON_EMPTY TILES RIGHT NOW
          // GET THIS TO RANDOMIZE, IT DOESNT WORK WITH NON_EMPTY TILES RIGHT NOW

          this.GameState.currentLevel.grid.addTile(tile.x, 0, new TileType("EMPTY"));
        }

        // If we move a tile off the bottom, dismiss it, then detroy it.
        if (tile.y >= this.GameState.currentLevel.grid.rows) {
          tile.emptyTile();
          tile.destroy();
        }
      }
    });
  }
}
