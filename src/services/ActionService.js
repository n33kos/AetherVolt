import Action      from 'classes/Action';
import AiService   from 'services/AiService';
import BaseService from 'services/BaseService';
import TurnService from 'services/TurnService';

export default class extends BaseService {
  constructor(GameState) {
    super(GameState);
    
    this.turnService = new TurnService(GameState);
  }

  cycleAction() {
    // Decrement action
    if (
      this.GameState.currentLevel.currentAction.actionType.type !== 'MOVE'
      && this.GameState.currentLevel.attackingPlayer.actions > 0
    ) {
      this.GameState.currentLevel.attackingPlayer.actions -= 1;
    }

    // Decrement movement
    if (
      this.GameState.currentLevel.currentAction.actionType.type === 'MOVE'
      && this.GameState.currentLevel.attackingPlayer.moves > 0
    ) {
        this.GameState.currentLevel.attackingPlayer.moves -= 1;
    }

    // Reset currrent action
    this.GameState.currentLevel.currentAction = new Action({
      player : this.GameState.currentLevel.attackingPlayer
    });

    // Automatically change turn if no actions or moves left
    if (this.GameState.currentLevel.attackingPlayer.actions === 0 && this.GameState.currentLevel.attackingPlayer.moves === 0) {
      this.turnService.cycleTurn();
    }

    // Update UI
    this.GameState.UI.updatePlayerStats(this.GameState.currentLevel.players);

    // Set an AI turn
    if (this.GameState.currentLevel.attackingPlayer.controller === 'AI') this.GameState.AiService.scheduleAction();
  }
}
