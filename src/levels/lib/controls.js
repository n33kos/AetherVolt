import cycleActions       from './cycleActions';
import findTileAtPosition from './findTileAtPosition';
import resetHover         from './resetHover';
import setHover           from './setHover';

export function handleMouseDown(e) {
  const clickedTile = findTileAtPosition.call(this, this.GameState.Controls.position);
  if (!clickedTile) return;

  // Set source tile in current action
  this.currentAction.sourceTile = clickedTile;

  if (clickedTile.isInHand) {
    this.tileHelper.initDrag(clickedTile, this.currentAction, cycleActions.bind(this));
  }
}

export function handleMouseMove(e) {
  resetHover.call(this);

  if (this.tileHelper.isDragging && this.tileHelper.tile) {
    this.tileHelper.tile.canvasPosition = this.GameState.Controls.position;
  }

  setHover.call(this, this.GameState.Controls.position);
}

export function handleMouseUp(e) {
  const clickedTile = findTileAtPosition.call(this, this.GameState.Controls.position);
  resetHover.call(this);

  // ----EMPTY TILE ACTION----
  if (
    !clickedTile
    || (!this.tileHelper.isDragging && clickedTile.tileType.type === 'EMPTY')
    || (this.tileHelper.isDragging && clickedTile === this.currentAction.sourceTile)
  ) {
    this.currentAction.sourceTile = null;
    this.currentAction.targetTile = null;
    this.tileHelper.clear();
    return;
  }

  // Set target tile in action
  this.currentAction.targetTile = clickedTile;

  //----PLACE ACTION----
  if (
    clickedTile.tileType.type === 'EMPTY'
    && this.currentAction.sourceTile
    && this.currentAction.sourceTile.isInHand
  ) {
    this.tileHelper.placeDraggedCell();
    this.tileHelper.clear();
  }
}
