import Action          from 'class/Action';
import cyclePlayerTurn from 'lib/cyclePlayerTurn';

export default function() {
  // Decrement action
  if (
    this.attackingPlayer.actions > 0
    && this.currentAction.actionType.type !== 'MOVE'
  ) {
    this.attackingPlayer.actions -= 1;
  }

  // Decrement movement
  if (
    this.attackingPlayer.moves > 0
    && this.currentAction.actionType.type === 'MOVE'
  ) {
      this.attackingPlayer.moves -= 1;
  }

  // Reset currrent action
  this.currentAction = new Action({ player : this.attackingPlayer });

  // Automatically change turn if not actions or moves left
  if (this.attackingPlayer.actions === 0 && this.attackingPlayer.moves === 0) {
    cyclePlayerTurn.call(this.GameState.currentLevel);
  }

  // Update UI
  this.GameState.UI.updatePlayerStats(this.players);
}
