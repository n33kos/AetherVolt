import GameState from 'classes/GameState';

const AetherVolt = { GameState };

document.addEventListener("DOMContentLoaded", (e) => {
  const GameState = new AetherVolt.GameState();
  GameState.init();

  // Add gamestate to window so we can inspect it if we like
  window.GameState = GameState;
});
