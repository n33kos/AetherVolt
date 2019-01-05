import cycleActions          from './cycleActions';
import getTileWithPlayerName from './getTileWithPlayerName';

export default function(playerName) {
  // Cant move if it isnt your turn
  if (this.attackingPlayer.name !== playerName) return;

  const playerTile = getTileWithPlayerName.call(this, playerName);
  this.currentAction.sourceTile = playerTile;
  this.tileHelper.initMove(
    playerTile,
    this.currentAction,
    cycleActions.bind(this),
  );
}
