// ---- Classes ----
import Audio    from 'classes/Audio';
import Canvas   from 'classes/Canvas';
import Controls from 'classes/Controls';
import Render   from 'classes/Render';
import Scene    from 'classes/Scene';
import UI       from 'classes/UI';
import Update   from 'classes/Update';

// ---- Configs ----
import captainsConfig  from 'configs/captains';
import gameStateConfig from 'configs/gameState';
import levelsConfig    from 'configs/levels';

// ---- Factories ----
import CaptainFactory from 'factories/CaptainFactory';
import LevelFactory   from 'factories/LevelFactory';

// ---- Services ----
import AiService from 'services/AiService';

export default class {
  constructor() {
    this.Audio = null;
    this.Canvas = null;
    this.captainFactory = new CaptainFactory(this);
    this.captains = [];
    this.Controls = null;
    this.currentLevel = null;
    this.levelFactory = new LevelFactory(this);
    this.Render = null;
    this.Scene = null;
    this.UI = null;
    this.AiService = null;

    this.loadConfigs();
  }

  loadConfigs() {
    // Loads configs into keys on `this`
    Object.keys(gameStateConfig).forEach(config => this[config] = gameStateConfig[config]);
  }

  init() {
    this.initCaptains();
    this.initLevels();

    this.Audio = new Audio(this);
    // Audio must be initialized after a user interacts somehow, this is a standard.
    // As such, the Audio class is initialized from the UI class when a button is clicked instead of here.

    this.AiService = new AiService(this);

    this.Canvas = new Canvas(this);
    this.Canvas.init();

    this.Controls = new Controls(this);
    this.Controls.init();

    this.Scene = new Scene(this);
    this.Scene.init();

    this.Render = new Render(this);
    this.Render.init();

    this.Update = new Update(this);
    this.Update.init();

    this.UI = new UI(this);
    this.UI.init();
  }

  initCaptains() {
    this.captains = captainsConfig.map(config => this.captainFactory.generateCaptain(config));
  }

  initLevels() {
    this.levels = levelsConfig.map(config => this.levelFactory.generateLevel(config));
  }

  loadCaptains() {
    this.captains.forEach(captain => captain.load());
  }

  loadLevel() {
    const newLevel = this.levels[this.level];

    this.loadCaptains();

    // In the future this array will be set via a hero select screen, for now its hard coded
    const players = [
      this.captains[0],
      this.captains[1],
    ];

    // SET PLAYER 1 TO HUMAN
    players[0].controller = 'Human';

    newLevel.setPlayers(players);

    // load level
    newLevel.load();

    // Set level as current level
    this.currentLevel = newLevel;

    // reset round counter to 1
    this.round = 1;

    // Remove focus from any UI elements clicked to prevent control misdirection
    document.activeElement.blur();

    // Render stats initially
    this.UI.updatePlayerStats(players);
    this.UI.updateGameStateStats();
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
