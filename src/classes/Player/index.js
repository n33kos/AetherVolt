import Avatar                from 'classes/Avatar';
import cycleActions          from 'lib/cycleActions';
import getPixelDensity       from 'lib/getPixelDensity';
import getTileWithPlayerName from 'lib/getTileWithPlayerName';
import Vector2               from 'classes/Vector2';

export default class {
  constructor({
    GameState,
    actions = 2,
    avatar,
    color = 'blue',
    controller = 'human',
    damage = 2,
    hand = [],
    handSize = 4,
    health = 50,
    maxActions = 2,
    maxHealth = 50,
    maxMoves = 1,
    moves = 1,
    name = 'Player 1',
    tiles = {},
    spritePath = '',
  }) {
    this.GameState = GameState;
    this.actions = actions;
    this.color = color;
    this.controller = controller;
    this.damage = damage;
    this.hand = hand;
    this.handSize = handSize;
    this.health = health;
    this.maxActions = maxActions;
    this.maxHealth = maxHealth;
    this.maxMoves = maxMoves;
    this.moves = moves;
    this.name = name;
    this.spritePath = spritePath;

    this.avatar = null;
    this.tiles = {
      // These IDs MUST match up with tileType IDs
      1 : `${this.spritePath}/Propeller_Conductor_Empty.png`,
      2 : `${this.spritePath}/Propeller_Conductor_Empty.png`,
      3 : `${this.spritePath}/Propeller_Conductor_Straight.png`,
      4 : `${this.spritePath}/Propeller_Conductor_Bend.png`,
      5 : `${this.spritePath}/Propeller_Conductor_Triple.png`,
      6 : `${this.spritePath}/Propeller_Conductor_Quad.png`,
    };
  }

  setAvatarPosition(tile) {
    const playerSide = (this.name === 'Player 1' ? -1 : 1);
    this.avatar.targetPosition = tile.canvasPosition;
  }

  load() {
    this.avatar = new Avatar({
      GameState : this.GameState,
      dimensions : new Vector2(64, 128),
      scale : new Vector2(
        2 * getPixelDensity(),
        2 * getPixelDensity(),
      ),
      playerName : this.name,
      offset : new Vector2(0.5, 0.5),
      onHover : () => {
        // Cant move if it isnt your turn
        if (this.GameState.currentLevel.attackingPlayer.name !== this.name) return;

        const playerTile = getTileWithPlayerName.call(this.GameState.currentLevel, this.name);
        this.GameState.currentLevel.currentAction.sourceTile = playerTile;
        this.GameState.currentLevel.tileHelper.initMove(
          playerTile,
          this.GameState.currentLevel.currentAction,
          cycleActions.bind(this.GameState.currentLevel),
        );
      },
      targetPosition : new Vector2(0, 0),
      animations : {
        mouseDown : {
          frames        : 12,
          loop          : true,
          spriteSheet   : `${this.spritePath}/Ship.png`,
          ticksPerFrame : 5,
        },
        mouseUp : {
          frames        : 12,
          loop          : true,
          spriteSheet   : `${this.spritePath}/Ship.png`,
          ticksPerFrame : 5,
        },
        hover : {
          frames        : 12,
          loop          : true,
          spriteSheet   : `${this.spritePath}/Ship.png`,
          ticksPerFrame : 5,
        },
        damage : {
          frames        : 8,
          loop          : true,
          spriteSheet   : `${this.spritePath}/Ship_Damage.png`,
          ticksPerFrame : 1,
        },
      },
    });
  }
}
