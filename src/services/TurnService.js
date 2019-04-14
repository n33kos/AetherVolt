import Action                     from 'classes/Action';
import ActionType                 from 'classes/ActionType';
import BaseService                from 'services/BaseService';
import Deck                       from 'classes/Deck';
import getRandomIntegerNotEqualTo from 'lib/getRandomIntegerNotEqualTo';
import getTileWithPlayer          from 'lib/getTileWithPlayer';
import handleLightningDischarge   from 'lib/handleLightningDischarge';

export default class extends BaseService {
  constructor(GameState) {
    super(GameState);
  }

  cycleTurn() {
    // Move player to random cell if they did not move
    if (this.GameState.forceMoveAtEndOfTurn && this.GameState.currentLevel.attackingPlayer.moves > 0) {
      const startingTile = getTileWithPlayer.call(this, this.GameState.currentLevel.attackingPlayer);
      const randomTile = getRandomIntegerNotEqualTo(startingTile.y, 0, this.GameState.currentLevel.columns);
      const finalTile = this.GameState.currentLevel.grid.tiles.find(tile => tile.id === `${startingTile.x}_${randomTile}`);

      if (startingTile && finalTile) {
        this.GameState.currentLevel.currentAction.actionType = new ActionType('MOVE');
        this.GameState.currentLevel.currentAction.sourceTile = startingTile;
        this.GameState.currentLevel.currentAction.targetTile = finalTile;
        this.GameState.currentLevel.currentAction.commit();
        this.GameState.currentLevel.tileHelper.clear();
      }
    }

    // Process the lightning dicharge
    handleLightningDischarge.call(this.GameState.currentLevel);

    // Set defending player
    this.GameState.currentLevel.defendingPlayer = this.GameState.currentLevel.players[this.GameState.currentLevel.currentPlayerTurn];

    // Hide old hand
    this.GameState.currentLevel.defendingPlayer.hand.setVisibility(false);

    // Reset old player's actions
    this.GameState.currentLevel.defendingPlayer.actions = this.GameState.currentLevel.defendingPlayer.maxActions;

    // Reset old players moves
    this.GameState.currentLevel.defendingPlayer.moves = this.GameState.currentLevel.defendingPlayer.maxMoves;

    // Increment turn
    this.GameState.currentLevel.currentPlayerTurn++;
    if (this.GameState.currentLevel.currentPlayerTurn >= this.GameState.currentLevel.players.length) this.GameState.currentLevel.currentPlayerTurn = 0;

    // Increment round
    if (this.GameState.currentLevel.currentPlayerTurn === 0) this.GameState.currentLevel.GameState.round += 1;

    // Set new attacking player
    this.GameState.currentLevel.attackingPlayer = this.GameState.currentLevel.players[this.GameState.currentLevel.currentPlayerTurn];

    // Draw a tile
    this.GameState.currentLevel.attackingPlayer.hand.add(this.GameState.currentLevel.deck.draw());

    // Show new hand
    this.GameState.currentLevel.attackingPlayer.hand.setVisibility(true);

    // Reset action at turn end
    this.GameState.currentLevel.currentAction = new Action({ player : this.GameState.currentLevel.attackingPlayer });

    // Update UI
    this.GameState.UI.updatePlayerStats(this.GameState.currentLevel.players);
    this.GameState.UI.updateGameStateStats();
  }
}
