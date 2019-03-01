import { throttle } from 'throttle-debounce';
import config       from 'config/controls';
import uuidv4       from 'uuid/v4';
import Vector2      from 'classes/Vector2';

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

  addCallback(eventKey, callBack, order = 0) {
    const newUUID = uuidv4();
    this.callbacks[eventKey].push({
      callBack,
      order,
      uuid: newUUID,
    });

    this.sortCallbacks();

    return newUUID;
  }

  sortCallbacks() {
    Object.keys(this.callbacks).forEach(eventKey => {
      this.callbacks[eventKey].sort((a, b) => a.order - b.order);
    });
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

    for (let entry of this.callbacks['touchStart']) {
      const breakAfterCallback = entry.callBack(e);
      if (breakAfterCallback) break;
    }
  }

  handleTouchEnd(e) {
    this.lastPosition = this.position;
    this.isMouseDown = false;

    for (let entry of this.callbacks['touchEnd']) {
      const breakAfterCallback = entry.callBack(e);
      if (breakAfterCallback) break;
    }
  }

  handleTouchMove(e) {
    e.preventDefault();
    this.setPosition(e);

    for (let entry of this.callbacks['touchMove']) {
      const breakAfterCallback = entry.callBack(e);
      if (breakAfterCallback) break;
    }
  }

  // -----Mouse-----
  handleMouseDown(e) {
    this.lastPosition = this.position;
    this.isMouseDown = true;

    for (let entry of this.callbacks['mouseDown']) {
      const breakAfterCallback = entry.callBack(e);
      if (breakAfterCallback) break;
    }
  }

  handleMouseUp(e) {
    this.lastPosition = this.position;
    this.isMouseDown = false;

    for (let entry of this.callbacks['mouseUp']) {
      const breakAfterCallback = entry.callBack(e);
      if (breakAfterCallback) break;
    }
  }

  handleMouseMove(e) {
    this.setPosition(e);

    for (let entry of this.callbacks['mouseMove']) {
      const breakAfterCallback = entry.callBack(e);
      if (breakAfterCallback) break;
    }
  }

  // -----Keypresses------
  handleKeyDown(e) {
    if (!this.pressedKeys.includes(e.keyCode)) this.pressedKeys.push(e.keyCode);

    for (let entry of this.callbacks['keyDown']) {
      const breakAfterCallback = entry.callBack(e);
      if (breakAfterCallback) break;
    }
  }

  handleKeyUp(e) {
    const index = this.pressedKeys.indexOf(e.keyCode);
    if (index > -1) this.pressedKeys.splice(index, 1);

    for (let entry of this.callbacks['keyUp']) {
      const breakAfterCallback = entry.callBack(e);
      if (breakAfterCallback) break;
    }
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
