export default function() {
  let gameOver = false;

  this.players.forEach(player => {
    if (player.health <= 0) {
      gameOver = true;
      player.health = 0;
    }
  });

  if (gameOver) {
    window.setTimeout(
      () => {
        this.winner = this.players.find(player => player.health > 0);
        this.GameState.isPaused = true;
        this.GameState.UI.updateScoreScreen();
        this.GameState.UI.setScreen('score');
      },
      1500,
    );
  }
}
