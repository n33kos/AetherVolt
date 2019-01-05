import Action            from 'class/Action';
import Deck              from 'class/Deck';
import processConnection from './processConnection';

export default function() {
  processConnection.call(this);

  // Set defending player
  this.defendingPlayer = this.players[this.currentPlayerTurn];

  // Hide old hand
  this.defendingPlayer.hand.setVisibility(false);

  // Reset old player's actions
  this.defendingPlayer.actions = this.defendingPlayer.maxActions;

  // Reset old players moves
  this.defendingPlayer.moves = this.defendingPlayer.maxMoves;

  // Increment turn
  this.currentPlayerTurn++;
  if (this.currentPlayerTurn >= this.players.length) this.currentPlayerTurn = 0;

  // Set new attacking player
  this.attackingPlayer = this.players[this.currentPlayerTurn];

  // Refresh deck if needed
  if (this.deck.tiles.length <= 0) {
    this.deck = new Deck({
      deckSize : this.rows * this.columns,
    });
  }

  // Draw a tile
  this.attackingPlayer.hand.add(this.deck.draw());

  // Show new hand
  this.attackingPlayer.hand.setVisibility(true);

  // Reset action at turn end
  this.currentAction = new Action({ player : this.attackingPlayer });

  // Update UI
  this.GameState.UI.updatePlayerStats(this.players);
}
