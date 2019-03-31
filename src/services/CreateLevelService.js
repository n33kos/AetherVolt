import Action      from 'classes/Action';
import Background  from 'classes/Background';
import BaseService from 'services/BaseService';
import Cloud       from 'classes/Cloud';
import Deck        from 'classes/Deck';
import Grid        from 'classes/Grid';
import Hand        from 'classes/Hand';
import Level       from 'classes/Level';
import Vector2     from 'classes/Vector2';

// VV These expect to be bound to the scope of the level class, there is probably a better pattern than this VV
import * as controls from 'lib/controls';

export default class extends BaseService {
  createLevel(config) {
    this.level = new Level({
      GameState : this.GameState,
      ...config,
    });

    // Make sure we bind the load function's 'this' to the level itself instead of the service
    this.level.load = this.generateLoadFunction.bind(this.level, config);

    return this.level;
  }

  generateLoadFunction(config) {
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
    this.addControlsCallback('mouseDown', controls.handleMouseDown.bind(this));
    this.addControlsCallback('mouseUp', controls.handleMouseUp.bind(this));
    this.addControlsCallback('mouseMove', controls.handleMouseMove.bind(this));

    this.addControlsCallback('touchStart', controls.handleMouseDown.bind(this));
    this.addControlsCallback('touchEnd', controls.handleMouseUp.bind(this));
    this.addControlsCallback('touchMove', controls.handleMouseMove.bind(this));
  }
}
