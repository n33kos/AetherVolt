// ---- Classes ----
import Action        from 'class/Action';
import Avatar        from 'class/Avatar';
import Background    from 'class/Background';
import Cloud         from 'class/Cloud';
import Deck          from 'class/Deck';
import Grid          from 'class/Grid';
import Hand          from 'class/Hand';
import Level         from 'class/Level';
import Player        from 'class/Player';
import TileHelper    from 'class/TileHelper';
import Vector2       from 'class/Vector2';

// ----- Level Functions ----
// VV These expect to be bound to the scope of this class, there is probably a better pattern than this VV
import * as controls      from 'lib/controls';
import cycleActions       from 'lib/cycleActions';
import findTileAtPosition from 'lib/findTileAtPosition';
import hoverAvatar        from 'lib/hoverAvatar';
import processConnection  from 'lib/processConnection';

export default class extends Level {
  constructor(config) {
    super(config);

    const {
      GameState,
    } = config;

    this.name = "Prototype Level";
    this.rows = 4;
    this.columns = 4;
    this.currentPlayerTurn = 0;
    this.selectedTile = null;
    this.currentAction = null;
    this.tileHelper = new TileHelper(GameState);
    this.attackingPlayer = null;
    this.defendingPlayer = null;
    this.hoveredTile = null;
  }

  load() {
    this.GameState.Scene.clear();

    // Add background
    const bg = new Background({
      GameState: this.GameState,
      dimensions: new Vector2(128, 256),
      offset: new Vector2(0, 0),
      scale: new Vector2(
        this.GameState.Canvas.width / 128,
        this.GameState.Canvas.height / 128,
      ),
    });
    bg.canvasPosition = new Vector2(0, -this.GameState.Canvas.height);
    this.GameState.Scene.add(bg);

    // Init deck
    this.deck = new Deck({
      deckSize : this.rows * this.columns,
    });

    // Init players
    this.players = [
      new Player({
        GameState : this.GameState,
        name : 'Player 1',
        id   : 0,
        color: '0,0,255',
        avatar: new Avatar({
          GameState : this.GameState,
          dimensions: new Vector2(64, 128),
          scale: new Vector2(
            Math.min(4, this.GameState.Canvas.width / 460),
            Math.min(4, this.GameState.Canvas.width / 460),
          ),
          offset: new Vector2(0.5, 0.5),
          onHover: hoverAvatar.bind(this, 'Player 1'),
          targetPosition : new Vector2(
            -256,
            this.GameState.Canvas.cy,
          ),
          animations : {
            mouseDown : {
              frames        : 12,
              loop          : true,
              spriteSheet   : './img/Ship.png',
              ticksPerFrame : 5,
            },
            mouseUp : {
              frames        : 12,
              loop          : true,
              spriteSheet   : './img/Ship.png',
              ticksPerFrame : 5,
            },
            hover : {
              frames        : 12,
              loop          : true,
              spriteSheet   : './img/Ship.png',
              ticksPerFrame : 5,
            },
            damage : {
              frames        : 8,
              loop          : true,
              spriteSheet   : './img/Ship_Damage.png',
              ticksPerFrame : 1,
            },
          },
        })
      }),
      new Player({
        GameState : this.GameState,
        name : 'Player 2',
        id   : 1,
        color: '255,0,0',
        avatar: new Avatar({
          GameState : this.GameState,
          dimensions: new Vector2(64, 128),
          scale: new Vector2(
            Math.min(4, this.GameState.Canvas.width / 460),
            Math.min(4, this.GameState.Canvas.width / 460),
          ),
          offset: new Vector2(0.5, 0.5),
          onHover: hoverAvatar.bind(this, 'Player 2'),
          targetPosition : new Vector2(
            this.GameState.Canvas.width + 256,
            this.GameState.Canvas.cy,
          ),
          mirrorX: true,
          animations : {
            mouseDown : {
              frames        : 12,
              loop          : true,
              spriteSheet   : './img/Ship.png',
              ticksPerFrame : 5,
            },
            mouseUp : {
              frames        : 12,
              loop          : true,
              spriteSheet   : './img/Ship.png',
              ticksPerFrame : 5,
            },
            hover : {
              frames        : 12,
              loop          : true,
              spriteSheet   : './img/Ship.png',
              ticksPerFrame : 5,
            },
            damage : {
              frames        : 8,
              loop          : true,
              spriteSheet   : './img/Ship_Damage.png',
              ticksPerFrame : 1,
            },
          },
        })
      }),
    ];
    this.attackingPlayer = this.players[0];
    this.defendingPlayer = this.players[1];

    // Init hands
    this.players.forEach((player, index) => {
      const hand = new Hand({
        GameState : this.GameState,
        position: new Vector2(0, -this.GameState.Canvas.cy),
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
      GameState : this.GameState,
      rows : this.rows,
      columns : this.columns,
      minimumPadding : 100,
      players: this.players,
    });
    this.grid.init();

    // Init current action
    this.currentAction = new Action({ player : this.attackingPlayer });

    // Add Clouds
    for (var i = 0; i < 3; i++) {
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

    // Init Controls
    this.addControlsCallback('mouseDown', controls.handleMouseDown.bind(this));
    this.addControlsCallback('mouseUp', controls.handleMouseUp.bind(this));
    this.addControlsCallback('mouseMove', controls.handleMouseMove.bind(this));

    this.addControlsCallback('touchStart', controls.handleMouseDown.bind(this));
    this.addControlsCallback('touchEnd', controls.handleMouseUp.bind(this));
    this.addControlsCallback('touchMove', controls.handleMouseMove.bind(this));
  }
}
