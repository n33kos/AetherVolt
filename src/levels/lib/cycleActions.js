import Action from 'class/Action';

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

  // Update UI
  this.GameState.UI.updatePlayerStats(this.players);
}
