import ActionType        from 'classes/ActionType';
import BaseService       from 'services/BaseService';
import cycleActions      from 'lib/cycleActions';
import cyclePlayerTurn   from 'lib/cyclePlayerTurn';
import getTileWithPlayer from 'lib/getTileWithPlayer';

export default class extends BaseService {
  constructor(config) {
    super(config);

    this.maxThinkyTime = 200;
  }

  scheduleAction() {
    window.setTimeout(
      this.fireAction.bind(this),
      Math.random() * this.maxThinkyTime,
    );
  }

  fireAction() {
    if (this.GameState.currentLevel.attackingPlayer.controller !== 'AI') return;

    const possibleActions = [];
    if (this.GameState.currentLevel.attackingPlayer.moves > 0) possibleActions.push(this.move.bind(this));
    if (this.GameState.currentLevel.attackingPlayer.actions > 0) possibleActions.push(this.rotate.bind(this));
    if (this.GameState.currentLevel.attackingPlayer.actions > 0) possibleActions.push(this.place.bind(this));

    const moveFunction = possibleActions[Math.floor(Math.random() * possibleActions.length)];
    if (moveFunction) moveFunction();
  }

  move() {
    const sourceTile = getTileWithPlayer.call(this.GameState.currentLevel, this.GameState.currentLevel.attackingPlayer);
    const targetTile = this.GameState.currentLevel.grid.tiles.find(
      tile => tile.id === `${sourceTile.x}_${sourceTile.y + (Math.random() > 0.5 ? -1 : 1)}`
    );

    if (targetTile && sourceTile) {
      this.GameState.currentLevel.currentAction.actionType = new ActionType('MOVE');
      this.GameState.currentLevel.currentAction.sourceTile = sourceTile;
      this.GameState.currentLevel.currentAction.targetTile = targetTile;
      this.GameState.currentLevel.currentAction.commit();
      cycleActions.call(this.GameState.currentLevel);
    } else {
      this.scheduleAction();
    }
  }

  rotate() {
    const tileToRotate = this.getRandomTileToRotate.call(this);

    if (tileToRotate) {
      this.GameState.currentLevel.currentAction.actionType = new ActionType('ROTATE');
      this.GameState.currentLevel.currentAction.rotationDirection = Math.random() > 0.5 ? -1 : 1;
      this.GameState.currentLevel.currentAction.targetTile = tileToRotate
      this.GameState.currentLevel.currentAction.commit();
      cycleActions.call(this.GameState.currentLevel);
    } else {
      this.scheduleAction();
    }
  }

  getRandomTileToRotate() {
    const tiles = this.GameState.currentLevel.grid.tiles.filter(tile => tile.tileType.type !== 'EMPTY');
    return tiles[Math.floor(Math.random() * tiles.length)] || null;
  }

  place() {
    const sourceTile = this.GameState.currentLevel.attackingPlayer.hand.tiles[
      Math.floor(Math.random() * this.GameState.currentLevel.attackingPlayer.hand.tiles.length)
    ];
    const targetTile = this.getEmptyTileToPlace.call(this);

    if (sourceTile && targetTile) {
      targetTile.placedBy = this.GameState.currentLevel.attackingPlayer;
      targetTile.setType(sourceTile.tileType);
      targetTile.targetRotation = sourceTile.targetRotation;
      targetTile.rotation = sourceTile.rotation;
      targetTile.neighborPattern = sourceTile.neighborPattern;
      targetTile.neighbors = targetTile.getNeighbors();
      targetTile.health = sourceTile.health;
      targetTile.maxHealth = sourceTile.maxHealth;
      this.GameState.currentLevel.attackingPlayer.hand.remove(sourceTile.uuid);
      this.GameState.currentLevel.currentAction.actionType = new ActionType('PLACE');

      this.GameState.currentLevel.currentAction.sourceTile = sourceTile;
      this.GameState.currentLevel.currentAction.targetTile = targetTile;

      this.GameState.currentLevel.currentAction.commit();
      cycleActions.call(this.GameState.currentLevel);
    } else {
      this.scheduleAction();
    }
  }

  getEmptyTileToPlace() {
    const tiles = this.GameState.currentLevel.grid.tiles.filter(tile => tile.tileType.type === 'EMPTY' && !tile.placedBy);
    return tiles[Math.floor(Math.random() * tiles.length)] || null;
  }
}
