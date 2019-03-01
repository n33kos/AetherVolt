import Avatar      from 'classes/Avatar';
import hoverAvatar from 'lib/hoverAvatar';
import Player      from 'classes/Player';
import Vector2     from 'classes/Vector2';

const captainName = 'Captain Jack';

export default function() {
  return new Player({
    GameState : this.GameState,
    name : captainName,
    id   : 0,
    color: '100,100,255',
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
          spriteSheet   : './img/captains/Jack/Ship.png',
          ticksPerFrame : 5,
        },
        mouseUp : {
          frames        : 12,
          loop          : true,
          spriteSheet   : './img/captains/Jack/Ship.png',
          ticksPerFrame : 5,
        },
        hover : {
          frames        : 12,
          loop          : true,
          spriteSheet   : './img/captains/Jack/Ship.png',
          ticksPerFrame : 5,
        },
        damage : {
          frames        : 8,
          loop          : true,
          spriteSheet   : './img/captains/Jack/Ship_Damage.png',
          ticksPerFrame : 1,
        },
      },
    }),
    tiles: {
      // These must match up with tileType IDs
      1 : './img/captains/Jack/Propeller_Conductor_Empty.png',
      2 : './img/captains/Jack/Propeller_Conductor_Empty.png',
      3 : './img/captains/Jack/Propeller_Conductor_Straight.png',
      4 : './img/captains/Jack/Propeller_Conductor_Bend.png',
      5 : './img/captains/Jack/Propeller_Conductor_Triple.png',
      6 : './img/captains/Jack/Propeller_Conductor_Quad.png',
    },
  });
}
