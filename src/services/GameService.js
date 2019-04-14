import BaseService   from 'services/BaseService';

export default class extends BaseService {
  endGame() {
    let gameOver = false;

    this.GameState.currentLevel.players.forEach(player => {
      if (player.health <= 0) {
        gameOver = true;
        player.health = 0;
      }
    });

    if (gameOver) {
      window.setTimeout(
        () => {
          this.GameState.currentLevel.winner = this.GameState.currentLevel.players.find(player => player.health > 0);
          this.GameState.isPaused = true;
          this.GameState.UI.updateScoreScreen();
          this.GameState.UI.setScreen('score');
        },
        1500,
      );
    }
  }

}
