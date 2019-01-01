import ActionType from 'class/ActionType';

export default class {
  constructor({
    type = new ActionType('ROTATE'),
    targetTile = null,
    sourceTile = null,
    player = null,
  }) {
    this.actionType = type;
    this.targetTile = targetTile;
    this.sourceTile = sourceTile;
    this.player = player;
    this.rotationDirection = 1;
  }

  rotate() {
    this.targetTile.rotateCell(this.rotationDirection);
    // Change ownership of tile on rotate
    this.targetTile.placedBy = this.player;
  }

  place() {
    this.targetTile.setType(this.sourceTile.tileType);
    this.targetTile.targetRotation = this.sourceTile.targetRotation;
    this.targetTile.rotation = this.sourceTile.rotation;
    this.targetTile.neighborPattern = this.sourceTile.neighborPattern;
    this.targetTile.neighbors = this.targetTile.getNeighbors();
    this.targetTile.placedBy = this.player;
    this.player.hand.remove(this.sourceTile.uuid);
  }

  move() {
    this.targetTile.player = this.sourceTile.player;
    this.sourceTile.player = null;
    this.targetTile.player.setAvatarPosition(this.targetTile);
  }

  commit() {
    switch (this.actionType.type) {
      case 'MOVE':
        this.move();
        break;
      case 'PLACE':
        this.place();
        break;
      case 'ROTATE':
        this.rotate();
        break;
    }
  }
}
