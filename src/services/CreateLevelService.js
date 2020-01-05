import Action         from 'classes/Action';
import AudioBuffer    from 'classes/AudioBuffer';
import Background     from 'classes/Background';
import BaseService    from 'services/BaseService';
import Cloud          from 'classes/Cloud';
import ControlService from 'services/ControlService';
import Deck           from 'classes/Deck';
import Grid           from 'classes/Grid';
import Hand           from 'classes/Hand';
import Level          from 'classes/Level';
import Vector2        from 'classes/Vector2';

export default class extends BaseService {
  constructor(GameState) {
    super(GameState);

    this.controlService = new ControlService(GameState);
  }

  createLevel(config) {
    this.level = new Level({
      GameState : this.GameState,
      ...config,
    });

    // Make sure we bind the load function's 'this' to the level itself instead of the service
    this.level.load = this.generateLoadFunction.bind(this.level, config, this.controlService);

    return this.level;
  }

  generateLoadFunction(config, controlService) {
    // Clear Scene
    if (config.clearOnLoad) {
      this.GameState.Scene.clear();
    }

    // Add background
    if (config.background) {
      const bg = new Background({
        GameState: this.GameState,
        dimensions: new Vector2(512, 1024),
        image : config.background,
        offset: new Vector2(0, 0),
        scale: new Vector2(
          this.GameState.Canvas.width / 512,
          this.GameState.Canvas.width / 512,
        ),
      });
      bg.canvasPosition = new Vector2(0, -this.GameState.Canvas.height);
      this.GameState.Scene.add(bg);
    }

    // Add Background Music
    if (config.backgroundAudio) {
      const audioNode = new AudioBuffer({
        audioFileUrl : config.backgroundAudio,
        autoPlay     : true,
        GameState    : this.GameState,
        shouldLoop   : true,
      });
      this.addAudioNode(audioNode);
    }

    // Seems like this ish is giving us slowdown
    if (config.cloudCount > 0) {
      for (var i = 0; i < config.cloudCount; i++) {
        const cloud = new Cloud({
          GameState: this.GameState,
          dimensions: new Vector2(32, 32),
          offset: new Vector2(0.5, 0.5),
          scale: new Vector2(
            15 + Math.floor(Math.random() * 15),
            15 + Math.floor(Math.random() * 15),
          ),
        });
        cloud.canvasPosition = new Vector2(
          Math.random() * this.GameState.Canvas.width,
          Math.random() * this.GameState.Canvas.height,
        );

        this.GameState.Scene.add(cloud);
      }
    }

    // Init deck
    this.deck = new Deck({
      deckSize  : config.deckSize,
      GameState : this.GameState,
    });

    // Set attacking player to first in array (this is brittle)
    this.attackingPlayer = this.players[0];
    this.defendingPlayer = this.players[1];

    // Init players
    this.players.forEach((player, index) => {
      const hand = new Hand({
        GameState : this.GameState,
        position: new Vector2(0, -this.GameState.Canvas.cy),
        player,
      });

      // Draw tiles from deck
      for (let i = 0; i < (player.handSize - index); i++) {
        hand.add(this.deck.draw());
      }

      // Set visibility of hand
      hand.setVisibility(false);
      if (index === this.currentPlayerTurn) hand.setVisibility(true);

      player.hand = hand;
      this.GameState.Scene.add(hand);
    });

    // Init grid, it automatically adds the tiles to the scene
    this.grid = new Grid({
      GameState      : this.GameState,
      rows           : this.rows,
      columns        : this.columns,
      minimumPadding : 100,
      players        : this.players,
    });
    this.grid.init();

    // Init current action
    this.currentAction = new Action({ player : this.attackingPlayer });

    // Init Controls
    this.addControlsCallback('mouseDown', controlService.handleMouseDown.bind(controlService));
    this.addControlsCallback('mouseUp', controlService.handleMouseUp.bind(controlService));
    this.addControlsCallback('mouseMove', controlService.handleMouseMove.bind(controlService));

    this.addControlsCallback('touchStart', controlService.handleMouseDown.bind(controlService));
    this.addControlsCallback('touchEnd', controlService.handleMouseUp.bind(controlService));
    this.addControlsCallback('touchMove', controlService.handleMouseMove.bind(controlService));
  }
}
