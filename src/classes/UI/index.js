import TurnService from 'services/TurnService';
import LightningService from 'services/LightningService';

export default class {
  constructor(GameState) {
    this.GameState = GameState;
    this.screens = document.querySelectorAll('[data-screen]');
    this.buttons = {
      attack     : document.querySelectorAll('[data-gamestate-attack]'),
      fullscreen : document.querySelectorAll('[data-gamestate-fullscreen]'),
      initAudio  : document.querySelectorAll('[data-gamestate-init-audio]'),
      level      : document.querySelectorAll('[data-gamestate-change-level]'),
      mute       : document.querySelectorAll('[data-gamestate-mute]'),
      pause      : document.querySelectorAll('[data-gamestate-pause]'),
      play       : document.querySelectorAll('[data-gamestate-play]'),
      quit       : document.querySelectorAll('[data-gamestate-quit]'),
      restart    : document.querySelectorAll('[data-gamestate-restart]'),
      screens    : document.querySelectorAll('[data-ui-target-screen]'),
      endTurn    : document.querySelectorAll('[data-gamestate-end-turn]'),
    };
    this.isFullscreen = false;
    this.turnService = new TurnService(GameState);
    this.lightningService = new LightningService(GameState);
  }

  init() {
    this.initListenters();
    this.setScreen('mainmenu');
    this.updateLevel(this.GameState.levels[this.GameState.level].name);
  }

  initListenters() {
    // Init audio on user input
    Array.from(this.buttons.initAudio).forEach(button => {
      button.addEventListener('click', () => {
        if (!this.GameState.Audio.isInitialized) {
          this.GameState.Audio.init();
          this.GameState.Audio.setMute(this.GameState.isMuted);
        }
      });
    });

    // Play buttons
    Array.from(this.buttons.play).forEach(button => {
      button.addEventListener('click', () => this.GameState.play() );
    });

    // Pause buttons
    Array.from(this.buttons.pause).forEach(button => {
      button.addEventListener('click', () => this.GameState.togglePause() );
    });

    // Restart Buttons
    Array.from(this.buttons.restart).forEach(button => {
      button.addEventListener('click', () => this.GameState.restart() );
    });

    //Fullscreen buttons
    Array.from(this.buttons.fullscreen).forEach(button => {
      button.addEventListener('click', () => this.toggleFullscreen() );
    });

    //Attack buttons
    Array.from(this.buttons.attack).forEach(button => {
      button.addEventListener('click', () => {
        this.lightningService.handleLightningDischarge();
      });
    });

    //Level selection buttons
    Array.from(this.buttons.level).forEach(button => {
      button.addEventListener('click', (e) => {
        this.GameState.level += parseInt(e.target.dataset.gamestateChangeLevel, 10);
        if (this.GameState.level >= this.GameState.levels.length) this.GameState.level = 0;
        if (this.GameState.level < 0) this.GameState.level = this.GameState.levels.length - 1;

        this.updateLevel(this.GameState.levels[this.GameState.level].name);
      });
    });

    // Quit buttons
    Array.from(this.buttons.quit).forEach(button => {
      button.addEventListener('click', () => this.GameState.quit() );
    });

    // Mute Buttons
    Array.from(this.buttons.mute).forEach(button => {
      button.addEventListener('click', (e) => this.GameState.Audio.toggleMute());
    });

    // UI Screen Transitions
    Array.from(this.buttons.screens).forEach(button => {
      button.addEventListener('click', this.initTransitions.bind(this));
    });

    // End turn button
    Array.from(this.buttons.endTurn).forEach(button => {
      button.addEventListener('click', () => {
        this.turnService.cycleTurn();
      });
    });
  }

  initTransitions(e) {
    this.setScreen(e.target.dataset.uiTargetScreen);
  }

  setScreen(screenToSet) {
    Array.from(this.screens).forEach(screen => {
      if (screen.dataset.screen === screenToSet) {
        screen.classList.add('active');
      } else {
        screen.classList.remove('active');
      }
    });
  }

  toggleFullscreen() {
    const elem = document.documentElement;

    /* View in fullscreen */
    if(!this.isFullscreen) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) { /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) { /* IE/Edge */
        elem.msRequestFullscreen();
      }
    }

    /* Close fullscreen */
    if(this.isFullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
    }

    this.isFullscreen = !this.isFullscreen;
  }

  updatePlayerStats(players) {
    if (!players) return;

    players.forEach((player, index) => {
      const wrapper = document.querySelector(`[data-ui-player="${index+1}"]`);
      if (this.GameState.currentLevel.currentPlayerTurn === index) {
        wrapper.classList.add('currentTurn');
      } else {
        wrapper.classList.remove('currentTurn');
      }

      const name = document.querySelector(`[data-ui-player="${index+1}"] [data-ui="name"]`);
      const health = document.querySelector(`[data-ui-player="${index+1}"] [data-ui="health"]`);
      const damage = document.querySelector(`[data-ui-player="${index+1}"] [data-ui="damage"]`);
      const actions = document.querySelector(`[data-ui-player="${index+1}"] [data-ui="actions"]`);
      const moves = document.querySelector(`[data-ui-player="${index+1}"] [data-ui="moves"]`);
      name.innerHTML = `${player.name}${this.GameState.currentLevel.currentPlayerTurn === index ? '*' : ''}`;
      health.innerHTML = `HP: ${player.health}/${player.maxHealth}`;
      damage.innerHTML = `DMG: ${player.damage}`;
      actions.innerHTML = `ACT: ${player.actions}/${player.maxActions}`;
      moves.innerHTML = `MOV: ${player.moves}/${player.maxMoves}`;
    });
  }

  updateGameStateStats() {
    const round = document.querySelector(`[data-gamestate-round]`);
    round.innerHTML = this.GameState.round;
  }

  updateLevel(level) {
    if (!level) return;

    Array.from(document.querySelectorAll('[data-ui="level"]')).forEach(levelElement => {
      levelElement.innerHTML = level;
    });
  }

  updateScoreScreen() {
    if (!this.GameState.currentLevel.winner) return;
    const winner = document.querySelector('[data-ui="winner"]');
    winner.innerHTML = `${this.GameState.currentLevel.winner.name} Wins!`;
  }
}
