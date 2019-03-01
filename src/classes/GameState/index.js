import config from 'configs/gameState';
import Level  from 'classes/Level';
import levels from 'configs/levels';

export default class {
  constructor() {
    this.deltaTime = config.deltaTime;
    this.isPaused = config.isPaused;
    this.level = config.level;
    this.levels = config.levels;
    this.score = config.score;
    this.playerName = config.playerName;
    this.currentLevel = new Level({ GameState: this });

    /*
      Class variables added in loader :
      - this.Audio
      - this.UI
      - this.Controls
      - this.Canvas
      - this.Scene
      - this.Render
    */
  }

  init() {
    this.initLevels();
  }

  initLevels() {
    this.levels = levels.map(level => {
      const lvl = new level({GameState : this});
      return lvl;
    });
  }

  loadLevel() {
    const newLevel = this.levels[this.level];

    // load level
    newLevel.load();
    this.currentLevel = newLevel;

    // Remove focus from any UI elements clicked to prevent control misdirection
    document.activeElement.blur();
  }

  play() {
    this.isPaused = false;
    this.loadLevel();
  }

  restart() {
    this.endlevel();
    this.play()
  }

  quit() {
    this.endlevel();
    this.UI.setScreen('mainmenu');
  }

  togglePause() {
    this.isPaused = !this.isPaused;

    if (this.isPaused) {
      this.Audio.audioContext.resume();
    }
    if (!this.isPaused) {
      this.Audio.audioContext.suspend();
    }
  }

  endlevel() {
    this.currentLevel.unload();
    this.isPaused = true;
    this.score = config.score;
  }
}
