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
      onClick : this.rotateLeft.bind(this),
      mouseDownSprite : './img/Rotate_Left.png',
      mouseUpSprite : './img/Rotate_Left.png',
      hoverSprite : './img/Rotate_Left.png',
      scale : tile.scale,
      dimensions : new Vector2(64, 64),
      order: -20,
    });
    leftButton.canvasPosition = new Vector2(
      tile.canvasPosition.x + (tile.dimensions.x * tile.scale.x / 2),
      tile.canvasPosition.y,
    );
    leftButton.calculateOffset();

    const rightButton = new SpriteButton({
      onClick : this.rotateRight.bind(this),
      mouseDownSprite : './img/Rotate_Right.png',
      mouseUpSprite : './img/Rotate_Right.png',
      hoverSprite : './img/Rotate_Right.png',
      scale : tile.scale,
      dimensions : new Vector2(64, 64),
      order: -20,
    });
    rightButton.canvasPosition = new Vector2(
      tile.canvasPosition.x - (tile.dimensions.x * tile.scale.x / 2),
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
    this.currentAction.rotationDirection = -1;
    this.currentAction.targetTile = this.tile;
    this.currentAction.commit();
    if (!this.tile.isInHand) {
      this.callback();
      this.clear();
    }
  }

  rotateRight() {
    this.currentAction.actionType = new ActionType('ROTATE');
    this.currentAction.rotationDirection = 1;
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

    const avatar = this.currentAction.sourceTile.player.avatar;

    const upButton = new SpriteButton({
      onClick : this.moveUp.bind(this),
      mouseDownSprite : './img/Move_Up.png',
      mouseUpSprite : './img/Move_Up.png',
      hoverSprite : './img/Move_Up.png',
      scale : tile.scale,
      dimensions : new Vector2(64, 64),
      order: -20,
    });
    upButton.canvasPosition = new Vector2(
      avatar.canvasPosition.x,
      avatar.canvasPosition.y - (avatar.dimensions.y * avatar.scale.y) / 2
    );
    upButton.calculateOffset();

    const downButton = new SpriteButton({
      onClick : this.moveDown.bind(this),
      mouseDownSprite : './img/Move_Down.png',
      mouseUpSprite : './img/Move_Down.png',
      hoverSprite : './img/Move_Down.png',
      scale : tile.scale,
      dimensions : new Vector2(64, 64),
      order: -20,
    });
    downButton.canvasPosition = new Vector2(
      avatar.canvasPosition.x,
      avatar.canvasPosition.y + (avatar.dimensions.y * avatar.scale.y) / 2
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
