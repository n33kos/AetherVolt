import Sprite  from 'class/Sprite';
import Vector2 from 'class/Vector2';

export default class extends Sprite {
  constructor(config) {
    super(config);

    const {
      x,
      y,
      sprite,
    } = config;

    this.x = x;
    this.y = y;
    this.id = `${x}_${y}`;

    this.animations = {
      exist: {
        frames        : 1,
        spriteSheet   : sprite,
        ticksPerFrame : 10,
      },
    };
    this.currentAnimation = 'exist';
  }
}
