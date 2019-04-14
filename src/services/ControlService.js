import ActionService      from 'services/ActionService';
import BaseService        from 'services/BaseService';
import TileService        from 'services/TileService';

export default class extends BaseService {
  constructor(GameState) {
    super(GameState);

    this.actionService = new ActionService(GameState);
    this.tileService = new TileService(GameState);
  }

  handleMouseDown(e) {
    const clickedTile = this.tileService.findTileAtPosition(this.GameState.Controls.position);
    if (!clickedTile) return;

    // Set source tile in current action
    this.GameState.currentLevel.currentAction.sourceTile = clickedTile;

    if (clickedTile.isInHand) {
      this.GameState.currentLevel.tileHelper.initDrag(
        clickedTile,
        this.GameState.currentLevel.currentAction,
        this.actionService.cycleAction
      );
    }
  }

  handleMouseMove(e) {
    this.resetHover();

    if (this.GameState.currentLevel.tileHelper.isDragging && this.GameState.currentLevel.tileHelper.tile) {
      this.GameState.currentLevel.tileHelper.tile.canvasPosition = this.GameState.Controls.position;
    }

    this.setHover(this.GameState.Controls.position);
  }

  handleMouseUp(e) {
    const clickedTile = this.tileService.findTileAtPosition(this.GameState.Controls.position);
    this.resetHover();

    // ----EMPTY TILE ACTION----
    if (
      !clickedTile
      || (!this.GameState.currentLevel.tileHelper.isDragging && clickedTile.tileType.type === 'EMPTY')
      || (this.GameState.currentLevel.tileHelper.isDragging && clickedTile === this.GameState.currentLevel.currentAction.sourceTile)
    ) {
      this.GameState.currentLevel.currentAction.sourceTile = null;
      this.GameState.currentLevel.currentAction.targetTile = null;
      this.GameState.currentLevel.tileHelper.clear();
      return;
    }

    // Set target tile in action
    this.GameState.currentLevel.currentAction.targetTile = clickedTile;

    //----PLACE ACTION----
    if (
      clickedTile.tileType.type === 'EMPTY'
      && this.GameState.currentLevel.currentAction.sourceTile
      && this.GameState.currentLevel.currentAction.sourceTile.isInHand
    ) {
      this.GameState.currentLevel.tileHelper.placeDraggedCell();
      this.GameState.currentLevel.tileHelper.clear();
    }
  }

  setHover(pos) {
    const hoveredTile = this.tileService.findTileAtPosition(pos);
    if (!hoveredTile) return;

    this.GameState.currentLevel.hoveredTile = hoveredTile;
    this.GameState.currentLevel.hoveredTile.isHovered = true;

    // ----ROTATE ACTION----
    if (!this.GameState.currentLevel.tileHelper.isDragging) {
      if (
        hoveredTile.tileType.type !== 'EMPTY'
        && hoveredTile.tileType.type !== 'PLAYER_COLUMN'
        && !this.GameState.currentLevel.hoveredTile.isInHand
      ) {
        this.GameState.currentLevel.tileHelper.initRotation(
          hoveredTile,
          this.GameState.currentLevel.currentAction,
          this.actionService.cycleAction
        );
      }

      if (hoveredTile.tileType.type === 'EMPTY') this.GameState.currentLevel.tileHelper.clear();
    }
  }

  resetHover() {
    this.GameState.currentLevel.grid.tiles.forEach(tile => tile.isHovered = false);
    this.GameState.currentLevel.hoveredTile = null;
  }
}
