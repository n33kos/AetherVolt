import BaseService  from 'services/BaseService';
import rectContains from 'lib/rectContains';
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
}
