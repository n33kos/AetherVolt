import cycleActions       from './cycleActions';
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
      this.tileHelper.initRotation(hoveredTile, this.currentAction, cycleActions.bind(this));
    }

    if (hoveredTile.tileType.type === 'EMPTY') this.tileHelper.clear();
  }
}
