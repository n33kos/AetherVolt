import Avatar      from 'classes/Avatar';
import hoverAvatar from 'lib/hoverAvatar';
import Player      from 'classes/Player';
import Vector2     from 'classes/Vector2';

const captainName = 'Captain Kcaj';

export default function() {
  return new Player({
    GameState : this.GameState,
    name : captainName,
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
      onHover: hoverAvatar.bind(this, captainName),
      targetPosition : new Vector2(
        -256,
        this.GameState.Canvas.cy,
      ),
      animations : {
        mouseDown : {
          frames        : 12,
          loop          : true,
          spriteSheet   : './img/captains/Kcaj/Ship.png',
          ticksPerFrame : 5,
        },
        mouseUp : {
          frames        : 12,
          loop          : true,
          spriteSheet   : './img/captains/Kcaj/Ship.png',
          ticksPerFrame : 5,
        },
        hover : {
          frames        : 12,
          loop          : true,
          spriteSheet   : './img/captains/Kcaj/Ship.png',
          ticksPerFrame : 5,
        },
        damage : {
          frames        : 8,
          loop          : true,
          spriteSheet   : './img/captains/Kcaj/Ship_Damage.png',
          ticksPerFrame : 1,
        },
      },
    })
  });
}
