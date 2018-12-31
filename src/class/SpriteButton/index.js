import rectContains from 'lib/rectContains';
import Sprite       from 'class/Sprite';
import Vector2      from 'class/Vector2';

export default class extends Sprite {
  constructor(config) {
    super(config);

    const {
      animations = null,
      callback = () => {},
      mouseDownSprite = '',
      mouseUpSprite = '',
    } = config;

    this.callback = callback;
    this.animations = animations;

    // This class allows passing in a custom animations array for animated buttons if you like
    // The default is a single frame for each mouseUp and mouseDown event
    if (!animations) {
      this.animations = {
        mouseDown : {
          frames        : 1,
          loop          : false,
          spriteSheet   : mouseDownSprite,
          ticksPerFrame : 10,
        },
        mouseUp : {
          frames        : 1,
          loop          : false,
          spriteSheet   : mouseUpSprite,
          ticksPerFrame : 10,
        }
      };
    }
    this.currentAnimation = 'mouseUp';

    this.addControlsCallback('mouseDown', this.handleMouseDown.bind(this));
    this.addControlsCallback('mouseUp', this.handleMouseUp.bind(this));
  }

  isPositionInButton(position) {
    return rectContains(
      position,
      new Vector2(
        this.canvasPosition.x - this.absoluteOffset.x,
        this.canvasPosition.y - this.absoluteOffset.y,
      ),
      new Vector2(
        this.dimensions.x * this.scale.x,
        this.dimensions.y * this.scale.y,
      ),
    );
  }

  handleMouseDown(e) {
    if (this.isPositionInButton(this.GameState.Controls.position)) {
      this.currentAnimation = 'mouseDown';
      this.currentFrame = 0;
    }
  }

  handleMouseUp() {
    this.currentAnimation = 'mouseUp';
    this.currentFrame = 0;

    if (this.isPositionInButton(this.GameState.Controls.position)) {
      this.callback();
    }
  }
}
