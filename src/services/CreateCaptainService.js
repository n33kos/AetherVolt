import Avatar                from 'classes/Avatar';
import BaseService           from 'services/BaseService';
import cycleActions          from 'lib/cycleActions';
import getPixelDensity       from 'lib/getPixelDensity';
import getTileWithPlayerName from 'lib/getTileWithPlayerName';
import Player                from 'classes/Player';
import Vector2               from 'classes/Vector2';

export default class extends BaseService {
  createCaptain(config) {
    this.player = new Player({
      GameState : this.GameState,
      name      : config.name,
      color     : config.color,
      avatar    : new Avatar({
        GameState : this.GameState,
        dimensions : new Vector2(64, 128),
        scale : new Vector2(
          2 * getPixelDensity(),
          2 * getPixelDensity(),
        ),
        playerName : config.name,
        offset : new Vector2(0.5, 0.5),
        onHover : this.generateOnHoverAvatarFunction(config),
        targetPosition : new Vector2(0, 0),
        animations : {
          mouseDown : {
            frames        : 12,
            loop          : true,
            spriteSheet   : `${config.spritePath}/Ship.png`,
            ticksPerFrame : 5,
          },
          mouseUp : {
            frames        : 12,
            loop          : true,
            spriteSheet   : `${config.spritePath}/Ship.png`,
            ticksPerFrame : 5,
          },
          hover : {
            frames        : 12,
            loop          : true,
            spriteSheet   : `${config.spritePath}/Ship.png`,
            ticksPerFrame : 5,
          },
          damage : {
            frames        : 8,
            loop          : true,
            spriteSheet   : `${config.spritePath}/Ship_Damage.png`,
            ticksPerFrame : 1,
          },
        },
      }),
      tiles     : {
        // These MUST match up with tileType IDs
        1 : `${config.spritePath}/Propeller_Conductor_Empty.png`,
        2 : `${config.spritePath}/Propeller_Conductor_Empty.png`,
        3 : `${config.spritePath}/Propeller_Conductor_Straight.png`,
        4 : `${config.spritePath}/Propeller_Conductor_Bend.png`,
        5 : `${config.spritePath}/Propeller_Conductor_Triple.png`,
        6 : `${config.spritePath}/Propeller_Conductor_Quad.png`,
      },
      moves     : config.moves,
      maxMoves  : config.maxMoves,
      health    : config.health,
      maxHealth : config.maxHealth,
    });

    return this.player;
  }

  generateOnHoverAvatarFunction(config) {
    return () => {
      // Cant move if it isnt your turn
      if (this.GameState.currentLevel.attackingPlayer.name !== config.name) return;

      const playerTile = getTileWithPlayerName.call(this.GameState.currentLevel, config.name);
      this.GameState.currentLevel.currentAction.sourceTile = playerTile;
      this.GameState.currentLevel.tileHelper.initMove(
        playerTile,
        this.GameState.currentLevel.currentAction,
        cycleActions.bind(this.GameState.currentLevel),
      );
    }
  }
}
