import config from 'configs/gameState';
import Level  from 'classes/Level';
import levels from 'configs/levels';

// ------ Captains -------
import jack from 'configs/captains/jack';
import kcaj from 'configs/captains/kcaj';

export default class {
  constructor() {
    this.deltaTime = config.deltaTime;
    this.isPaused = config.isPaused;
    this.level = config.level;
    this.levels = config.levels;
    this.score = config.score;
    this.currentLevel = new Level({ GameState: this });
    this.captains = [];

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

  initCaptains() {
    this.captains = {
      kcaj : kcaj(this),
      jack : jack(this),
    };
  }

  initLevels() {
    this.levels = levels.map(level => level(this));
  }

  loadLevel() {
    const newLevel = this.levels[this.level];

    // In the future this array will be set via a hero select screen
    this.initCaptains();
    const players = [
      this.captains.jack,
      this.captains.kcaj,
    ];

    // load level
    newLevel.load(players);
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
