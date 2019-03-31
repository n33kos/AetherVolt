// ---- Configs ----
import captainsConfig  from 'configs/captains';
import gameStateConfig from 'configs/gameState';
import levelsConfig    from 'configs/levels';

// ---- Factories ----
import CaptainFactory from 'factories/CaptainFactory';
import LevelFactory   from 'factories/LevelFactory';

export default class {
  constructor() {
    this.deltaTime = gameStateConfig.deltaTime;
    this.isPaused = gameStateConfig.isPaused;
    this.level = gameStateConfig.level;
    this.levels = gameStateConfig.levels;
    this.score = gameStateConfig.score;
    this.currentLevel = null;
    this.captains = {};
    this.levelFactory = new LevelFactory(this);
    this.captainFactory = new CaptainFactory(this);

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
    captainsConfig.forEach(config => this.captains[config.name] = this.captainFactory.generateCaptain(config));
  }

  initLevels() {
    this.levels = levelsConfig.map(config => this.levelFactory.generateLevel(config));
  }

  loadLevel() {
    const newLevel = this.levels[this.level];

    // Need to figure out a way to load these on init instead of in here
    this.initCaptains();

    // In the future this array will be set via a hero select screen, for now its hard coded
    newLevel.setPlayers([
      this.captains.Jack,
      this.captains.Kcaj,
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
    this.score = gameStateConfig.score;
  }
}
