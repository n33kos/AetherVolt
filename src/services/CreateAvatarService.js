import Avatar          from 'classes/Avatar';
import BaseService     from 'services/BaseService';
import getPixelDensity from 'lib/getPixelDensity';
import Vector2         from 'classes/Vector2';

export default class extends BaseService {
  createAvatar(config) {
    this.avatar = new Avatar({
      GameState : this.GameState,
      dimensions : new Vector2(64, 128),
      scale : new Vector2(
        getPixelDensity(),
        getPixelDensity(),
      ),
      playerName : config.player.name,
      offset : new Vector2(0.5, 0.5),
      onHover : () => {
        // Cant move if it isnt your turn so return nothing on hover
        if (this.GameState.currentLevel.attackingPlayer.name !== config.player.name) return;

        // Make the move helper visible for the player
        this.GameState.currentLevel.tileHelper.initArrowMove(config.player);
      },
      targetPosition : new Vector2(0, 0),
      animations : {
        mouseDown : {
          frames        : 12,
          loop          : true,
          spriteSheet   : `${config.player.spritePath}/Ship.png`,
          ticksPerFrame : 5,
        },
        mouseUp : {
          frames        : 12,
          loop          : true,
          spriteSheet   : `${config.player.spritePath}/Ship.png`,
          ticksPerFrame : 5,
        },
        hover : {
          frames        : 12,
          loop          : true,
          spriteSheet   : `${config.player.spritePath}/Ship.png`,
          ticksPerFrame : 5,
        },
        damage : {
          frames        : 8,
          loop          : true,
          spriteSheet   : `${config.player.spritePath}/Ship_Damage.png`,
          ticksPerFrame : 1,
        },
      },
    });

    return this.avatar;
  }
}
