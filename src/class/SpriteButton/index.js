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

    this.addControlsCallback(
      'mouseDown',
      this.handleMouseDown.bind(this),
      -10 // lower GUI order so it processes first and can break the loop for buttons below
    );
    this.addControlsCallback(
      'mouseUp',
      this.handleMouseUp.bind(this),
      -10 // lower GUI order so it processes first and can break the loop for buttons below
    );
  }

  isPositionInButton(position) {
    return rectContains(
      position,
      new Vector2(
        // We multiply by the mirror value again because of how scaling flips the canvasPosition
        // Still doesn't work right if offset isn't (0.5, 0.5) 🤷
        this.canvasPosition.x + (this.absoluteOffset.x * (this.mirrorX ? -1 : 1)),
        this.canvasPosition.y + (this.absoluteOffset.y * (this.mirrorY ? -1 : 1)),
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
      return true;
    }
  }

  handleMouseUp() {
    this.currentAnimation = 'mouseUp';
    this.currentFrame = 0;

    if (this.isPositionInButton(this.GameState.Controls.position)) {
      this.callback();
      return true;
    }
  }
}
