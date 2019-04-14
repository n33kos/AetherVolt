import ActionService      from 'services/ActionService';
import findTileAtPosition from './findTileAtPosition';

export default function(pos) {
  const hoveredTile = findTileAtPosition.call(this, pos);
  if (!hoveredTile) return;

  this.hoveredTile = hoveredTile;
  this.hoveredTile.isHovered = true;

  // ----ROTATE ACTION----
  if (!this.tileHelper.isDragging) {
    if (
      hoveredTile.tileType.type !== 'EMPTY'
      && hoveredTile.tileType.type !== 'PLAYER_COLUMN'
      && !this.hoveredTile.isInHand
    ) {
      const actionService = new ActionService(this.GameState);
      this.tileHelper.initRotation(hoveredTile, this.currentAction, actionService.cycleAction);
    }

    if (hoveredTile.tileType.type === 'EMPTY') this.tileHelper.clear();
  }
}
