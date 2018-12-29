import { throttle } from 'throttle-debounce';
import config       from 'config/controls';
import uuidv4       from 'uuid/v4';
import Vector2      from 'class/Vector2';

export default class {
  constructor(GameState) {
    this.GameState = GameState;
    this.isMouseDown = false;
    this.lastPosition = null;
    this.position = null;
    this.pressedKeys = [];
    this.debounceValue = 10;

    // refer to `config/controls` for callback event names
    this.callbacks = config.callbacks;
  }

  addCallback(eventKey, callBack) {
    const newUUID = uuidv4();
    this.callbacks[eventKey].push({
      uuid: newUUID,
      callBack,
    });

    return newUUID;
  }

  clearCallbacks() {
    this.callbacks = config.callbacks;
  }

  removeCallback(callBackUUID) {
    Object.keys(this.callbacks).forEach(eventKey => {
      this.callbacks[eventKey] = this.callbacks[eventKey].filter(
        callback => callback.uuid !== callBackUUID,
      );
    });
  }

  init() {
    // Mouse
    document.addEventListener("mousemove", throttle(this.debounceValue, (e) => this.handleMouseMove(e)));
    document.addEventListener("mousedown", (e) => this.handleMouseDown(e));
    document.addEventListener("mouseup", (e) => this.handleMouseUp(e));

    // Touch
    document.addEventListener('touchmove', throttle(this.debounceValue, (e) => this.handleTouchMove(e)));
    document.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    document.addEventListener("touchend", (e) => this.handleTouchEnd(e));

    // Keys
    document.onkeydown = this.handleKeyDown.bind(this);
    document.onkeyup = this.handleKeyUp.bind(this);
  }

  // -----Touch-----
  handleTouchStart(e) {
    this.lastPosition = this.position;
    this.isMouseDown = true;

    this.callbacks['touchStart'].forEach(({ callBack }) => callBack(e));
  }

  handleTouchEnd(e) {
    this.lastPosition = this.position;
    this.isMouseDown = false;

    this.callbacks['touchEnd'].forEach(({ callBack }) => callBack(e));
  }

  handleTouchMove(e) {
    e.preventDefault();
    this.setPosition(e);
    this.callbacks['touchMove'].forEach(({ callBack }) => callBack(e));
  }

  // -----Mouse-----
  handleMouseDown(e) {
    this.lastPosition = this.position;
    this.isMouseDown = true;

    this.callbacks['mouseDown'].forEach(({ callBack }) => callBack(e));
  }

  handleMouseUp(e) {
    this.lastPosition = this.position;
    this.isMouseDown = false;

    this.callbacks['mouseUp'].forEach(({ callBack }) => callBack(e));
  }

  handleMouseMove(e) {
    this.setPosition(e);
    this.callbacks['mouseMove'].forEach(({ callBack }) => callBack(e));
  }

  // -----Keypresses------
  handleKeyDown(e) {
    if (!this.pressedKeys.includes(e.keyCode)) this.pressedKeys.push(e.keyCode);

    this.callbacks['keyDown'].forEach(({ callBack }) => callBack(e));
  }

  handleKeyUp(e) {
    const index = this.pressedKeys.indexOf(e.keyCode);
    if (index > -1) this.pressedKeys.splice(index, 1);

    this.callbacks['keyUp'].forEach(({ callBack }) => callBack(e));
  }

  setPosition(e) {
    if ('clientX' in e) {
      this.position = new Vector2(
        e.clientX * this.GameState.Canvas.scale,
        e.clientY * this.GameState.Canvas.scale,
      );
    }

    if ('targetTouches' in e) {
      this.position = new Vector2(
        e.targetTouches[0].clientX * this.GameState.Canvas.scale,
        e.targetTouches[0].clientY * this.GameState.Canvas.scale,
      );
    }
  }
}
