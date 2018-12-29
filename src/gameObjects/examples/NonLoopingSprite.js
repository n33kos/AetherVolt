import Sprite  from 'class/Sprite';
import Vector2 from 'class/Vector2';

export default class extends Sprite {
  constructor(config) {
    super(config);

    this.animations = {
      count : {
        frames        : 5,
        loop          : false,
        spriteSheet   : './img/examples/numbers.png',
        ticksPerFrame : 20,
      },
    };
    this.currentAnimation = 'count';
  }
}
