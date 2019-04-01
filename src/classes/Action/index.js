import ActionType from 'classes/ActionType';

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
  }

  place() {
    this.targetTile.placedBy = this.player;
    this.targetTile.setType(this.sourceTile.tileType);
    this.targetTile.targetRotation = this.sourceTile.targetRotation;
    this.targetTile.rotation = this.sourceTile.rotation;
    this.targetTile.neighborPattern = this.sourceTile.neighborPattern;
    this.targetTile.neighbors = this.targetTile.getNeighbors();
    this.targetTile.health = this.sourceTile.health;
    this.targetTile.maxHealth = this.sourceTile.maxHealth;
    this.player.hand.remove(this.sourceTile.uuid);
  }

  move() {
    this.targetTile.player = this.sourceTile.player;
    this.sourceTile.player = null;
    this.targetTile.player.setAvatarPosition(this.targetTile);
  }

  commit() {
    if (this.player.actions > 0) {
      switch (this.actionType.type) {
        case 'PLACE':
          this.place();
          break;
        case 'ROTATE':
          this.rotate();
          break;
      }
    }

    if (this.player.moves > 0 && this.actionType.type === 'MOVE') {
      this.move();
    }
  }
}
