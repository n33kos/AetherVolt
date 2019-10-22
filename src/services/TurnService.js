import Action                     from 'classes/Action';
import ActionType                 from 'classes/ActionType';
import BaseService                from 'services/BaseService';
import GameService                from 'services/GameService';
import getRandomIntegerNotEqualTo from 'lib/getRandomIntegerNotEqualTo';
import LightningService           from 'services/LightningService';
import TileService                from 'services/TileService';

export default class extends BaseService {
  constructor(GameState) {
    super(GameState);

    this.tileService = new TileService(GameState);
    this.lightningService = new LightningService(GameState);
    this.gameService = new GameService(GameState);
  }

  cycleTurn() {
    // Move player to random cell if they did not move
    if (this.GameState.forceMoveAtEndOfTurn && this.GameState.currentLevel.attackingPlayer.moves > 0) {
      const startingTile = this.tileService.getTileWithPlayer(this.GameState.currentLevel.attackingPlayer);
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
    if (this.GameState.autoAttackAtEndOfTurn) {
      this.lightningService.handleLightningDischarge();
    }

    // Check if game is completed
    this.gameService.endGame();

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

    // Upon return to the first player's turn
    if (this.GameState.currentLevel.currentPlayerTurn === 0) {
      // Increment round
      this.GameState.currentLevel.GameState.round += 1;

      // Move tiles down a row
      if (this.GameState.tilesMoveDownEachRound) this.tileService.pushTilesDown();
    }

    // Clear any squeued actions for previous player
    if (this.GameState.AiService.scheduledActions.length > 0) this.GameState.AiService.clearScheduledActions();

    // Set new attacking player
    this.GameState.currentLevel.attackingPlayer = this.GameState.currentLevel.players[this.GameState.currentLevel.currentPlayerTurn];

    // Set an AI turn
    if (this.GameState.currentLevel.attackingPlayer.controller === 'AI') this.GameState.AiService.scheduleAction();

    // Draw a tile if we haven't met handSize
    if (this.GameState.currentLevel.attackingPlayer.hand.tiles.length < this.GameState.currentLevel.attackingPlayer.handSize) {
      this.GameState.currentLevel.attackingPlayer.hand.add(this.GameState.currentLevel.deck.draw());
    }

    // Show new hand
    this.GameState.currentLevel.attackingPlayer.hand.setVisibility(true);

    // Reset action at turn end
    this.GameState.currentLevel.currentAction = new Action({ player : this.GameState.currentLevel.attackingPlayer });

    // Update UI
    this.GameState.UI.updatePlayerStats(this.GameState.currentLevel.players);
    this.GameState.UI.updateGameStateStats();
  }
}
