import ActionType   from 'class/ActionType';
import cloneClass   from 'lib/cloneClass';
import SpriteButton from 'class/SpriteButton';
import Vector2      from 'class/Vector2';

export default class {
  constructor(GameState) {
    this.GameState = GameState;
    this.helperUUIDs = [];
    this.tile = null;
    this.currentAction = null;
    this.callback = () => {};
    this.isRotating = false;
    this.isDragging = false;
    this.isMoving = false;
  }

  initRotation(tile, currentAction, callback) {
    this.clear();

    this.tile = tile;
    this.currentAction = currentAction;
    this.callback = callback;
    this.isRotating = true;

    const leftButton = new SpriteButton({
      callback : this.rotateLeft.bind(this),
      mouseDownSprite : './img/rotate.png',
      mouseUpSprite : './img/rotate.png',
      scale : tile.scale,
      dimensions : new Vector2(64, 64),
      mirrorX : true,
      order: -20,
    });
    leftButton.canvasPosition = new Vector2(
      tile.canvasPosition.x - (tile.dimensions.x * tile.scale.x),
      tile.canvasPosition.y,
    );
    leftButton.calculateOffset();

    const rightButton = new SpriteButton({
      callback : this.rotateRight.bind(this),
      mouseDownSprite : './img/rotate.png',
      mouseUpSprite : './img/rotate.png',
      scale : tile.scale,
      dimensions : new Vector2(64, 64),
      order: -20,
    });
    rightButton.canvasPosition = new Vector2(
      tile.canvasPosition.x + (tile.dimensions.x * tile.scale.x),
      tile.canvasPosition.y,
    );
    rightButton.calculateOffset();

    this.helperUUIDs = [
      this.GameState.Scene.add(leftButton),
      this.GameState.Scene.add(rightButton),
    ];
  }

  rotateLeft() {
    this.currentAction.actionType = new ActionType('ROTATE');
    this.currentAction.rotationDirection = 1;
    this.currentAction.targetTile = this.tile;
    this.currentAction.commit();
    if (!this.tile.isInHand) {
      this.callback();
      this.clear();
    }
  }

  rotateRight() {
    this.currentAction.actionType = new ActionType('ROTATE');
    this.currentAction.rotationDirection = -1;
    this.currentAction.targetTile = this.tile;
    this.currentAction.commit();
    if (!this.tile.isInHand) {
      this.callback();
      this.clear();
    }
  }

  initDrag(tile, currentAction, callback) {
    this.clear();

    this.currentAction = currentAction;
    this.callback = callback;
    this.isDragging = true;

    const tilePreview = cloneClass(tile);
    tilePreview.alpha = 0.75;
    this.helperUUIDs = [this.GameState.Scene.add(tilePreview)];

    // Set the tile to the preview element, not the original
    // Its position is directly manipulated in the level's mousemove
    this.tile = tilePreview;
  }

  placeDraggedCell() {
    this.currentAction.actionType = new ActionType('PLACE');
    this.currentAction.commit();
    this.callback();
  }

  initMove(tile, currentAction, callback) {
    this.clear();

    this.tile = tile;
    this.currentAction = currentAction;
    this.callback = callback;
    this.isMoving = true;

    const upButton = new SpriteButton({
      callback : this.moveUp.bind(this),
      mouseDownSprite : './img/move.png',
      mouseUpSprite : './img/move.png',
      scale : tile.scale,
      dimensions : new Vector2(64, 64),
      order: -20,
    });
    upButton.canvasPosition = new Vector2(
      tile.canvasPosition.x,
      tile.canvasPosition.y - (
        this.GameState.currentLevel.players[this.GameState.currentLevel.currentPlayerTurn].avatar.dimensions.y
        * this.GameState.currentLevel.players[this.GameState.currentLevel.currentPlayerTurn].avatar.scale.y
      ) / 2
    );
    upButton.calculateOffset();

    const downButton = new SpriteButton({
      callback : this.moveDown.bind(this),
      mouseDownSprite : './img/move.png',
      mouseUpSprite : './img/move.png',
      scale : tile.scale,
      dimensions : new Vector2(64, 64),
      mirrorY : true,
      order: -20,
    });
    downButton.canvasPosition = new Vector2(
      tile.canvasPosition.x,
      tile.canvasPosition.y + (
        this.GameState.currentLevel.players[this.GameState.currentLevel.currentPlayerTurn].avatar.dimensions.y
        * this.GameState.currentLevel.players[this.GameState.currentLevel.currentPlayerTurn].avatar.scale.y
      ) / 2
    );
    downButton.calculateOffset();

    this.helperUUIDs = [
      this.GameState.Scene.add(upButton),
      this.GameState.Scene.add(downButton),
    ];
  }

  moveUp() {
    this.currentAction.actionType = new ActionType('MOVE');
    const target = this.GameState.currentLevel.grid.tiles.find(
      tile => tile.id === `${this.tile.x}_${this.tile.y - 1}`
    );
    if (target) {
      this.currentAction.targetTile = target;
      this.currentAction.commit();
      this.callback();
    }

    this.clear();
  }

  moveDown() {
    this.currentAction.actionType = new ActionType('MOVE');
    const target = this.GameState.currentLevel.grid.tiles.find(
      tile => tile.id === `${this.tile.x}_${this.tile.y + 1}`
    );
    if (target) {
      this.currentAction.targetTile = target;
      this.currentAction.commit();
      this.callback();
    }

    this.clear();
  }

  clear() {
    this.helperUUIDs.forEach(uuid => this.GameState.Scene.remove(uuid))
    this.helperUUIDs = [];
    this.tile = null;
    this.currentAction = null;
    this.callback = () => {};
    this.isRotating = false;
    this.isDragging = false;
    this.isMoving = false;
  }
}
