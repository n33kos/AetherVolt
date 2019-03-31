import config from 'configs/gameState';
import levels from 'configs/levels';

// ------ Captains -------
import jack from 'configs/captains/jack';
import kcaj from 'configs/captains/kcaj';

// import CaptainFactory from 'factories/CaptainFactory';
import LevelFactory   from 'factories/LevelFactory';

export default class {
  constructor() {
    this.deltaTime = config.deltaTime;
    this.isPaused = config.isPaused;
    this.level = config.level;
    this.levels = config.levels;
    this.score = config.score;
    this.currentLevel = null;
    this.captains = [];
    this.levelFactory = new LevelFactory(this);

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
    // this.initCaptains(); //currently being initialized on level load, fix that.
    this.initLevels();
  }

  initCaptains() {
    this.captains = {
      kcaj : kcaj(this),
      jack : jack(this),
    };
  }

  initLevels() {
    this.levels = levels.map(levelConfig => this.levelFactory.generateLevel(levelConfig));
  }

  loadLevel() {
    const newLevel = this.levels[this.level];

    // Need to figure out a way to load these on init instead of in here
    this.initCaptains();

    // In the future this array will be set via a hero select screen, for now its hard coded
    newLevel.setPlayers([
      this.captains.jack,
      this.captains.kcaj,
    ]);

    // load level
    newLevel.load();

    // Set level as current level
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
