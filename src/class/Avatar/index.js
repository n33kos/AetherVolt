import Sprite  from 'class/Sprite';
import Vector2 from 'class/Vector2';

export default class extends Sprite {
  constructor(config) {
    super(config);

    const {
      sprite,
    } = config;

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
