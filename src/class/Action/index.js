import ActionType from 'class/ActionType';

export default class {
  constructor({
    type = new ActionType('ROTATE'),
    targetTile = null,
    sourceTile = null,
    player = null,
    callback = null,
  }) {
    this.actionType = type;
    this.targetTile = targetTile;
    this.sourceTile = sourceTile;
    this.player = player;
    this.callback = callback;
  }

  rotate() {
    this.targetTile.rotateCell(1);
  }

  place() {
    this.targetTile.setType(this.sourceTile.tileType);
    this.targetTile.rotation = this.sourceTile.rotation;
    this.player.hand.remove(this.sourceTile.uuid);
  }

  move() {
    this.targetTile.setExclusivePlayer(this.player);
    this.player.setAvatarPosition(this.targetTile);
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
    this.callback();
  }
}
