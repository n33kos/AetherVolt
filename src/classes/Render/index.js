export default class {
  constructor(GameState) {
    this.GameState = GameState;
    this.isRunning = false;
  }

  init() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.render();
    };
  }

  shouldRender() {
    return !this.GameState.isPaused;
  }

  render() {
    // Request new frame
    if (this.isRunning) window.requestAnimationFrame(this.render.bind(this));

    // Bail out early
    if(!this.shouldRender()) return;

    // Clear screen
    this.GameState.Canvas.clear();

    // Draw Entities
    this.GameState.Scene.gameObjects.forEach(entity => entity.drawEntity());
  }
}
