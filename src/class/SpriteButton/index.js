import rectContains from 'lib/rectContains';
import Sprite       from 'class/Sprite';
import Vector2      from 'class/Vector2';

export default class extends Sprite {
  constructor(config) {
    super(config);

    const {
      animations = null,
      onClick = () => {},
      onHover = () => {},
      mouseDownSprite = null,
      mouseUpSprite = null,
      hoverSprite = null,
      order = -10, // default to low GUI order so it processes first and can break the loop for buttons below
    } = config;

    this.onClick = onClick;
    this.onHover = onHover;
    this.animations = animations;

    // This class allows passing in a custom animations array for animated buttons if you like
    // The default is a single frame for each mouseUp and mouseDown event
    if (!animations) {
      this.animations = {
        mouseDown : {
          frames        : 1,
          loop          : false,
          spriteSheet   : mouseDownSprite || mouseUpSprite,
          ticksPerFrame : 10,
        },
        mouseUp : {
          frames        : 1,
          loop          : false,
          spriteSheet   : mouseUpSprite,
          ticksPerFrame : 10,
        },
        hover : {
          frames        : 1,
          loop          : false,
          spriteSheet   : hoverSprite || mouseUpSprite,
          ticksPerFrame : 10,
        }
      };
    }
    this.currentAnimation = 'mouseUp';

    this.addControlsCallback('mouseDown', this.handleMouseDown.bind(this), order);
    this.addControlsCallback('mouseMove', this.handleMouseMove.bind(this), order);
    this.addControlsCallback('mouseUp', this.handleMouseUp.bind(this), order);
    this.addControlsCallback('touchStart', this.handleMouseDown.bind(this), order);
    this.addControlsCallback('touchMove', this.handleMouseMove.bind(this), order);
    this.addControlsCallback('touchEnd', this.handleMouseUp.bind(this), order);
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

  handleMouseMove() {
    if (this.isPositionInButton(this.GameState.Controls.position)) {
      this.currentAnimation = 'hover';
      this.onHover();
    } else {
      this.currentAnimation = 'mouseUp';
    }
  }

  handleMouseDown() {
    if (this.isPositionInButton(this.GameState.Controls.position)) {
      this.currentAnimation = 'mouseDown';
      return true; // Returning true breaks execution of event processing loop, preventing other actions from firing
    }
  }

  handleMouseUp() {
    this.currentAnimation = 'mouseUp';

    if (this.isPositionInButton(this.GameState.Controls.position)) {
      this.onClick();
      return true; // Returning true breaks execution of event processing loop, preventing other actions from firing
    }
  }
}
