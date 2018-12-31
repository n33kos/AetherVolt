(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("PipeDream", [], factory);
	else if(typeof exports === 'object')
		exports["PipeDream"] = factory();
	else
		root["PipeDream"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, _class);

    this.x = x;
    this.y = y;
  }

  _createClass(_class, [{
    key: "toArray",
    value: function toArray() {
      return [this.x, this.y];
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var rng = __webpack_require__(16);
var bytesToUuid = __webpack_require__(17);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof options == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(type) {
    _classCallCheck(this, _class);

    this.id = this.getTypeId(type);
    this.type = this.getTypeString(this.id);
    this.spriteSheet = this.getSpriteSheet(this.id);
    this.neighborPattern = this.getNeighborPattern(this.id);
  }

  _createClass(_class, [{
    key: 'getTypeId',
    value: function getTypeId(type) {
      var ids = {
        EMPTY: 1,
        PLAYER_COLUMN: 2,
        STRAIGHT: 3,
        BEND: 4,
        TRIPLE: 5,
        QUAD: 6
      };

      return ids[type];
    }
  }, {
    key: 'getTypeString',
    value: function getTypeString(id) {
      var types = {
        1: 'EMPTY',
        2: 'PLAYER_COLUMN',
        3: 'STRAIGHT',
        4: 'BEND',
        5: 'TRIPLE',
        6: 'QUAD'
      };

      return types[id];
    }
  }, {
    key: 'getSpriteSheet',
    value: function getSpriteSheet(id) {
      var sprites = {
        1: './img/Pipes_Empty.png',
        2: './img/Pipes_Empty.png',
        3: './img/Pipes_Straight.png',
        4: './img/Pipes_Bend.png',
        5: './img/Pipes_Triple.png',
        6: './img/Pipes_Quad.png'
      };

      return sprites[id];
    }
  }, {
    key: 'getNeighborPattern',
    value: function getNeighborPattern(id) {
      var patterns = {
        1: [],
        2: [0, 1, 2, 3],
        3: [1, 3],
        4: [0, 1],
        5: [0, 1, 3],
        6: [0, 1, 2, 3]
      };

      return patterns[id];
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Sprite2 = __webpack_require__(8);

var _Sprite3 = _interopRequireDefault(_Sprite2);

var _Vector = __webpack_require__(0);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Sprite) {
  _inherits(_class, _Sprite);

  function _class(config) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, config));

    var x = config.x,
        y = config.y,
        id = config.id,
        type = config.type,
        player = config.player,
        _config$isInHand = config.isInHand,
        isInHand = _config$isInHand === undefined ? false : _config$isInHand,
        _config$isSelected = config.isSelected,
        isSelected = _config$isSelected === undefined ? false : _config$isSelected,
        _config$dragPosition = config.dragPosition,
        dragPosition = _config$dragPosition === undefined ? null : _config$dragPosition;


    _this.x = x;
    _this.y = y;
    _this.id = id;
    _this.tileType = type;
    _this.player = player;
    _this.isInHand = isInHand;
    _this.isSelected = isSelected;
    _this.dragPosition = dragPosition;

    _this.animations = {
      exist: {
        frames: 8,
        spriteSheet: './img/Pipes_Empty.png',
        ticksPerFrame: 5,
        loop: false
      }
    };
    _this.currentAnimation = 'exist';
    _this.neighborPattern = [];
    _this.isHovered = false;
    _this.placedBy = false;

    _this.setType(type);
    _this.calculateOffset();
    return _this;
  }

  _createClass(_class, [{
    key: 'setType',
    value: function setType(type) {
      this.tileType = type;
      this.animations.exist.spriteSheet = type.spriteSheet;
      this.neighborPattern = type.neighborPattern;
      this.load();
    }
  }, {
    key: 'init',
    value: function init(grid) {
      this.grid = grid;
      this.neighbors = this.getNeighbors();
    }
  }, {
    key: 'getNeighbors',
    value: function getNeighbors() {
      var _this2 = this;

      var neighbors = [];
      if (!this.grid) return [];

      if (this.neighborPattern.includes(0)) {
        neighbors.push(this.grid.find(function (cell) {
          return cell.id == _this2.x + 1 + '_' + _this2.y;
        }));
      }
      if (this.neighborPattern.includes(1)) {
        neighbors.push(this.grid.find(function (cell) {
          return cell.id == _this2.x + '_' + (_this2.y + 1);
        }));
      }
      if (this.neighborPattern.includes(2)) {
        neighbors.push(this.grid.find(function (cell) {
          return cell.id == _this2.x - 1 + '_' + _this2.y;
        }));
      }
      if (this.neighborPattern.includes(3)) {
        neighbors.push(this.grid.find(function (cell) {
          return cell.id == _this2.x + '_' + (_this2.y - 1);
        }));
      }

      return neighbors;
    }
  }, {
    key: 'rotateCell',
    value: function rotateCell(direction) {
      var newRotation = this.rotation + Math.PI / (2 * direction);
      if (newRotation >= Math.PI * 2) newRotation = 0;
      if (newRotation < 0) newRotation = Math.PI * 1.5;
      this.rotation = newRotation;

      this.neighborPattern = this.neighborPattern.map(function (id) {
        id += direction;
        if (id < 0) id = 3;
        if (id > 3) id = 0;
        return id;
      });

      this.neighbors = this.getNeighbors();
    }
  }, {
    key: 'draw',
    value: function draw() {
      _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'draw', this).call(this);
      this.drawOutline();
    }
  }, {
    key: 'setOutlineColor',
    value: function setOutlineColor() {
      this.GameState.Canvas.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      if (this.tileType.type === 'PLAYER_COLUMN') this.GameState.Canvas.ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
      if (this.isHovered || this.isInHand) {
        this.GameState.Canvas.ctx.strokeStyle = this.GameState.currentLevel.players[this.GameState.currentLevel.currentPlayerTurn].color;
      }
      if (this.isSelected) this.GameState.Canvas.ctx.strokeStyle = 'pink';
      if (this.placedBy) this.GameState.Canvas.ctx.strokeStyle = this.placedBy.color;
    }
  }, {
    key: 'drawOutline',
    value: function drawOutline() {
      this.GameState.Canvas.ctx.beginPath();
      this.GameState.Canvas.ctx.lineWidth = 1 * window.devicePixelRatio;
      this.setOutlineColor();
      this.GameState.Canvas.ctx.rect(0, 0, this.dimensions.x * this.scale.x, this.dimensions.y * this.scale.y);
      this.GameState.Canvas.ctx.stroke();
    }
  }]);

  return _class;
}(_Sprite3.default);

exports.default = _class;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/* eslint-disable no-undefined,no-param-reassign,no-shadow */

/**
 * Throttle execution of a function. Especially useful for rate limiting
 * execution of handlers on events like resize and scroll.
 *
 * @param  {Number}    delay          A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}   [noTrailing]   Optional, defaults to false. If noTrailing is true, callback will only execute every `delay` milliseconds while the
 *                                    throttled-function is being called. If noTrailing is false or unspecified, callback will be executed one final time
 *                                    after the last throttled-function call. (After the throttled-function has not been called for `delay` milliseconds,
 *                                    the internal counter is reset)
 * @param  {Function}  callback       A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                    to `callback` when the throttled-function is executed.
 * @param  {Boolean}   [debounceMode] If `debounceMode` is true (at begin), schedule `clear` to execute after `delay` ms. If `debounceMode` is false (at end),
 *                                    schedule `callback` to execute after `delay` ms.
 *
 * @return {Function}  A new, throttled, function.
 */
function throttle(delay, noTrailing, callback, debounceMode) {

	/*
  * After wrapper has stopped being called, this timeout ensures that
  * `callback` is executed at the proper times in `throttle` and `end`
  * debounce modes.
  */
	var timeoutID;

	// Keep track of the last time `callback` was executed.
	var lastExec = 0;

	// `noTrailing` defaults to falsy.
	if (typeof noTrailing !== 'boolean') {
		debounceMode = callback;
		callback = noTrailing;
		noTrailing = undefined;
	}

	/*
  * The `wrapper` function encapsulates all of the throttling / debouncing
  * functionality and when executed will limit the rate at which `callback`
  * is executed.
  */
	function wrapper() {

		var self = this;
		var elapsed = Number(new Date()) - lastExec;
		var args = arguments;

		// Execute `callback` and update the `lastExec` timestamp.
		function exec() {
			lastExec = Number(new Date());
			callback.apply(self, args);
		}

		/*
   * If `debounceMode` is true (at begin) this is used to clear the flag
   * to allow future `callback` executions.
   */
		function clear() {
			timeoutID = undefined;
		}

		if (debounceMode && !timeoutID) {
			/*
    * Since `wrapper` is being called for the first time and
    * `debounceMode` is true (at begin), execute `callback`.
    */
			exec();
		}

		// Clear any existing timeout.
		if (timeoutID) {
			clearTimeout(timeoutID);
		}

		if (debounceMode === undefined && elapsed > delay) {
			/*
    * In throttle mode, if `delay` time has been exceeded, execute
    * `callback`.
    */
			exec();
		} else if (noTrailing !== true) {
			/*
    * In trailing throttle mode, since `delay` time has not been
    * exceeded, schedule `callback` to execute `delay` ms after most
    * recent execution.
    *
    * If `debounceMode` is true (at begin), schedule `clear` to execute
    * after `delay` ms.
    *
    * If `debounceMode` is false (at end), schedule `callback` to
    * execute after `delay` ms.
    */
			timeoutID = setTimeout(debounceMode ? clear : exec, debounceMode === undefined ? delay - elapsed : delay);
		}
	}

	// Return the wrapper function.
	return wrapper;
}

/* eslint-disable no-undefined */

/**
 * Debounce execution of a function. Debouncing, unlike throttling,
 * guarantees that a function is only executed a single time, either at the
 * very beginning of a series of calls, or at the very end.
 *
 * @param  {Number}   delay         A zero-or-greater delay in milliseconds. For event callbacks, values around 100 or 250 (or even higher) are most useful.
 * @param  {Boolean}  [atBegin]     Optional, defaults to false. If atBegin is false or unspecified, callback will only be executed `delay` milliseconds
 *                                  after the last debounced-function call. If atBegin is true, callback will be executed only at the first debounced-function call.
 *                                  (After the throttled-function has not been called for `delay` milliseconds, the internal counter is reset).
 * @param  {Function} callback      A function to be executed after delay milliseconds. The `this` context and all arguments are passed through, as-is,
 *                                  to `callback` when the debounced-function is executed.
 *
 * @return {Function} A new, debounced function.
 */
function debounce(delay, atBegin, callback) {
	return callback === undefined ? throttle(delay, atBegin, false) : throttle(delay, callback, atBegin !== false);
}

exports.throttle = throttle;
exports.debounce = debounce;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LoadedEntity2 = __webpack_require__(6);

var _LoadedEntity3 = _interopRequireDefault(_LoadedEntity2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_LoadedEntity) {
  _inherits(_class, _LoadedEntity);

  function _class(config) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, config));

    _this.name = 'Default Level';
    return _this;
  }

  _createClass(_class, [{
    key: 'gameLogic',
    value: function gameLogic() {
      // Override this function to add level specific game logic
    }
  }]);

  return _class;
}(_LoadedEntity3.default);

exports.default = _class;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(_ref) {
    var GameState = _ref.GameState;

    _classCallCheck(this, _class);

    this.GameState = GameState;
    this.audioNodes = [];
    this.controlCallbackIds = [];
  }

  _createClass(_class, [{
    key: "load",
    value: function load() {}
  }, {
    key: "unload",
    value: function unload() {
      var _this = this;

      // Stop audio nodes
      this.audioNodes.forEach(function (audioNode) {
        audioNode.stop(0);
      });
      this.audioNodes = [];

      // Remove control callbacks
      this.controlCallbackIds.forEach(function (callbackId) {
        _this.GameState.Controls.removeCallback(callbackId);
      });
      this.controlCallbackIds = [];
    }
  }, {
    key: "addControlsCallback",
    value: function addControlsCallback(eventKey, callback) {
      this.controlCallbackIds.push(this.GameState.Controls.addCallback(eventKey, callback));
    }
  }, {
    key: "addAudioNode",
    value: function addAudioNode(audioNode) {
      this.audioNodes.push(audioNode);
      audioNode.load();
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(type) {
    _classCallCheck(this, _class);

    this.id = this.getTypeId(type);
    this.type = this.getTypeString(this.id);
  }

  _createClass(_class, [{
    key: 'getTypeId',
    value: function getTypeId(type) {
      var ids = {
        MOVE: 1,
        PLACE: 2,
        ROTATE: 3
      };

      return ids[type];
    }
  }, {
    key: 'getTypeString',
    value: function getTypeString(id) {
      var types = {
        1: 'MOVE',
        2: 'PLACE',
        3: 'ROTATE'
      };

      return types[id];
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = __webpack_require__(9);

var _Entity3 = _interopRequireDefault(_Entity2);

var _Vector = __webpack_require__(0);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Entity) {
  _inherits(_class, _Entity);

  function _class(config) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, config));

    var animations = config.animations,
        _config$currentFrame = config.currentFrame,
        currentFrame = _config$currentFrame === undefined ? 0 : _config$currentFrame,
        _config$currentAnimat = config.currentAnimation,
        currentAnimation = _config$currentAnimat === undefined ? null : _config$currentAnimat,
        _config$mirrorX = config.mirrorX,
        mirrorX = _config$mirrorX === undefined ? false : _config$mirrorX,
        _config$mirrorY = config.mirrorY,
        mirrorY = _config$mirrorY === undefined ? false : _config$mirrorY,
        _config$scale = config.scale,
        scale = _config$scale === undefined ? new _Vector2.default(1, 1) : _config$scale;


    _this.animations = animations;
    /*
      animations is an array of animation objects with the following options:
      jump : {
        frames        : 12,
        loop          : true,
        spriteSheet   : './img/idle.png',
        ticksPerFrame : 4,
      }
    */

    _this.currentAnimation = currentAnimation;
    _this.currentFrame = currentFrame;
    _this.scale = scale;
    _this.mirrorX = mirrorX;
    _this.mirrorY = mirrorY;

    _this.lastAnimation = null;
    _this.tickCounter = 0;
    return _this;
  }

  _createClass(_class, [{
    key: 'load',
    value: function load() {
      var _this2 = this;

      Object.keys(this.animations).forEach(function (animation) {
        var img = new Image();
        img.src = _this2.animations[animation].spriteSheet;
        _this2.animations[animation].image = img;
      });
    }
  }, {
    key: 'calculateOffset',
    value: function calculateOffset() {
      if (!this.scale) return;
      this.absoluteOffset = new _Vector2.default(-(this.offset.x * this.dimensions.x * this.scale.x * (this.mirrorX ? -1 : 1)), -(this.offset.y * this.dimensions.y * this.scale.y * (this.mirrorY ? -1 : 1)));
    }
  }, {
    key: 'draw',
    value: function draw() {
      if (!this.animations[this.currentAnimation]) return;

      this.handleFrames();

      if (this.mirrorX || this.mirrorY) {
        // No need to reset canvas transforms, Entity class handles that
        this.GameState.Canvas.ctx.scale(this.mirrorX ? -1 : 1, this.mirrorY ? -1 : 1);
      }

      this.GameState.Canvas.ctx.drawImage(this.animations[this.currentAnimation].image, this.currentFrame * this.dimensions.x, 0, this.dimensions.x, this.dimensions.y, 0, 0, this.dimensions.x * this.scale.x, this.dimensions.y * this.scale.y);
    }
  }, {
    key: 'handleFrames',
    value: function handleFrames() {
      // repeat animations
      this.tickCounter++;

      // Loop Logic
      if (this.animations[this.currentAnimation].loop) {
        this.incrementAnimationFrame();

        // Reset to first frame
        if (this.currentFrame >= this.animations[this.currentAnimation].frames) {
          this.currentFrame = 0;
        }
      }

      // No-loop Logic
      if (!this.animations[this.currentAnimation].loop) {
        if (this.currentFrame >= this.animations[this.currentAnimation].frames - 1) {
          this.tickCounter = 0;
          this.currentFrame = this.animations[this.currentAnimation].frames - 1;
        } else {
          this.incrementAnimationFrame();
        }
      }

      // Reset to first frame on animation switch
      if (this.lastAnimation !== this.currentAnimation) {
        this.lastAnimation = this.currentAnimation;
        this.currentFrame = 0;
        this.tickCounter = 0;
      }
    }
  }, {
    key: 'incrementAnimationFrame',
    value: function incrementAnimationFrame() {
      // Increment frame and reset tickCounter
      if (this.tickCounter > this.animations[this.currentAnimation].ticksPerFrame) {
        this.tickCounter = 0;
        this.currentFrame += 1;
      }
    }
  }]);

  return _class;
}(_Entity3.default);

exports.default = _class;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _LoadedEntity2 = __webpack_require__(6);

var _LoadedEntity3 = _interopRequireDefault(_LoadedEntity2);

var _Vector = __webpack_require__(0);

var _Vector2 = _interopRequireDefault(_Vector);

var _worldSpaceToCanvas = __webpack_require__(24);

var _worldSpaceToCanvas2 = _interopRequireDefault(_worldSpaceToCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Override this class to create game entities.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 Draw canvas calls at position 0,0 as position, rotation, and offset will be applied automagically
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               */


var _class = function (_LoadedEntity) {
  _inherits(_class, _LoadedEntity);

  function _class(config) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, config));

    var _config$dimensions = config.dimensions,
        dimensions = _config$dimensions === undefined ? new _Vector2.default(100, 100) : _config$dimensions,
        _config$offset = config.offset,
        offset = _config$offset === undefined ? new _Vector2.default(0.5, 0.5) : _config$offset,
        _config$position = config.position,
        position = _config$position === undefined ? new _Vector2.default() : _config$position,
        _config$rotation = config.rotation,
        rotation = _config$rotation === undefined ? 0 : _config$rotation,
        _config$alpha = config.alpha,
        alpha = _config$alpha === undefined ? 1 : _config$alpha;


    _this.absoluteOffset = new _Vector2.default();
    _this.audioNodes = [];
    _this.canvasPosition = new _Vector2.default();
    _this.controlCallbackIds = [];
    _this.dimensions = dimensions;
    _this.GameState = GameState;
    _this.offset = offset;
    _this.position = position;
    _this.rotation = rotation;
    _this.isVisible = true;
    _this.alpha = alpha;

    _this.setPosition(position);
    return _this;
  }

  // Remember: use setPosition instead of directly setting position var.


  _createClass(_class, [{
    key: 'setPosition',
    value: function setPosition(position) {
      this.position = position;
      this.canvasPosition = (0, _worldSpaceToCanvas2.default)(this.GameState, this.position);
      this.calculateOffset();
    }
  }, {
    key: 'calculateOffset',
    value: function calculateOffset() {
      this.absoluteOffset = new _Vector2.default(-(this.offset.x * this.dimensions.x), -(this.offset.y * this.dimensions.y));
    }
  }, {
    key: 'drawEntity',
    value: function drawEntity() {
      if (!this.isVisible) return;

      // Move canvas, rotate, then add offset.
      this.GameState.Canvas.ctx.translate(this.canvasPosition.x, this.canvasPosition.y);
      this.GameState.Canvas.ctx.rotate(this.rotation);
      this.GameState.Canvas.ctx.translate(this.absoluteOffset.x, this.absoluteOffset.y);
      this.GameState.Canvas.ctx.globalAlpha = this.alpha;

      this.draw();

      // Reset transforms
      this.GameState.Canvas.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.GameState.Canvas.ctx.globalAlpha = 1;
    }
  }, {
    key: 'update',
    value: function update() {
      // Override this function for the entity's update loop
    }
  }, {
    key: 'draw',
    value: function draw() {
      // Override this function for the entity's draw loop
    }
  }]);

  return _class;
}(_LoadedEntity3.default);

exports.default = _class;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (min, max) {
  return Math.random() * (max - min) + min;
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Audio = __webpack_require__(12);

var _Audio2 = _interopRequireDefault(_Audio);

var _Canvas = __webpack_require__(13);

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Controls = __webpack_require__(14);

var _Controls2 = _interopRequireDefault(_Controls);

var _GameState = __webpack_require__(18);

var _GameState2 = _interopRequireDefault(_GameState);

var _Render = __webpack_require__(33);

var _Render2 = _interopRequireDefault(_Render);

var _Scene = __webpack_require__(34);

var _Scene2 = _interopRequireDefault(_Scene);

var _UI = __webpack_require__(35);

var _UI2 = _interopRequireDefault(_UI);

var _Update = __webpack_require__(36);

var _Update2 = _interopRequireDefault(_Update);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PipeDream = {
  Audio: _Audio2.default,
  Canvas: _Canvas2.default,
  Controls: _Controls2.default,
  GameState: _GameState2.default,
  Render: _Render2.default,
  Scene: _Scene2.default,
  UI: _UI2.default,
  Update: _Update2.default
};

document.addEventListener("DOMContentLoaded", function (e) {
  var GameState = new PipeDream.GameState();
  GameState.init();

  // Add gamestate to window so we can inspect it if we like
  window.GameState = GameState;

  // Audio needs to be initialized after user input, refer to UI class for init() call
  GameState.Audio = new PipeDream.Audio(GameState);

  GameState.Canvas = new PipeDream.Canvas(GameState);
  GameState.Canvas.init();

  GameState.Controls = new PipeDream.Controls(GameState);
  GameState.Controls.init();

  GameState.Scene = new PipeDream.Scene(GameState);
  GameState.Scene.init();

  GameState.Render = new PipeDream.Render(GameState);
  GameState.Render.init();

  GameState.Update = new PipeDream.Update(GameState);
  GameState.Update.init();

  GameState.UI = new PipeDream.UI(GameState);
  GameState.UI.init();
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(GameState) {
    _classCallCheck(this, _class);

    this.GameState = GameState;
    this.audioContext = null;
    this.masterAudioNode = null;
    this.isInitialized = false;
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      var audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.audioContext = audioContext;

      var master = audioContext.createGain();
      master.gain.value = 0.75;
      master.connect(audioContext.destination);
      this.masterAudioNode = master;

      this.isInitialized = true;
    }
  }, {
    key: 'toggleMute',
    value: function toggleMute() {
      if (this.audioContext.state === 'running') {
        this.audioContext.suspend();
      } else if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _throttleDebounce = __webpack_require__(4);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(GameState) {
    _classCallCheck(this, _class);

    this.GameState = GameState;
    this.cx = null;
    this.cy = null;
    this.canvas = null;
    this.ctx = null;
    this.scale = 1;
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      this.setDimensions();
      this.initCanvas();
    }
  }, {
    key: 'setDimensions',
    value: function setDimensions() {
      this.scale = window.devicePixelRatio;
      this.width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) * this.scale;

      this.height = (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) * this.scale;
    }
  }, {
    key: 'initCanvas',
    value: function initCanvas() {
      var _this = this;

      var canvas = document.querySelector('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.cx = this.width / 2;
      this.cy = this.height / 2;
      this.canvas = canvas;

      var ctx = canvas.getContext('2d');
      this.ctx = ctx;

      this.resizeCanvas();

      window.addEventListener('resize', (0, _throttleDebounce.throttle)(500, function () {
        _this.setDimensions();
        _this.resizeCanvas();
      }));
    }
  }, {
    key: 'resizeCanvas',
    value: function resizeCanvas() {
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.cx = this.width / 2;
      this.cy = this.height / 2;
      this.ctx.imageSmoothingEnabled = false;
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _throttleDebounce = __webpack_require__(4);

var _controls = __webpack_require__(15);

var _controls2 = _interopRequireDefault(_controls);

var _v = __webpack_require__(1);

var _v2 = _interopRequireDefault(_v);

var _Vector = __webpack_require__(0);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(GameState) {
    _classCallCheck(this, _class);

    this.GameState = GameState;
    this.isMouseDown = false;
    this.lastPosition = null;
    this.position = null;
    this.pressedKeys = [];
    this.debounceValue = 10;

    // refer to `config/controls` for callback event names
    this.callbacks = _controls2.default.callbacks;
  }

  _createClass(_class, [{
    key: 'addCallback',
    value: function addCallback(eventKey, callBack) {
      var newUUID = (0, _v2.default)();
      this.callbacks[eventKey].push({
        uuid: newUUID,
        callBack: callBack
      });

      return newUUID;
    }
  }, {
    key: 'clearCallbacks',
    value: function clearCallbacks() {
      this.callbacks = _controls2.default.callbacks;
    }
  }, {
    key: 'removeCallback',
    value: function removeCallback(callBackUUID) {
      var _this = this;

      Object.keys(this.callbacks).forEach(function (eventKey) {
        _this.callbacks[eventKey] = _this.callbacks[eventKey].filter(function (callback) {
          return callback.uuid !== callBackUUID;
        });
      });
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this;

      // Mouse
      document.addEventListener("mousemove", (0, _throttleDebounce.throttle)(this.debounceValue, function (e) {
        return _this2.handleMouseMove(e);
      }));
      document.addEventListener("mousedown", function (e) {
        return _this2.handleMouseDown(e);
      });
      document.addEventListener("mouseup", function (e) {
        return _this2.handleMouseUp(e);
      });

      // Touch
      document.addEventListener('touchmove', (0, _throttleDebounce.throttle)(this.debounceValue, function (e) {
        return _this2.handleTouchMove(e);
      }));
      document.addEventListener('touchstart', function (e) {
        return _this2.handleTouchStart(e);
      });
      document.addEventListener("touchend", function (e) {
        return _this2.handleTouchEnd(e);
      });

      // Keys
      document.onkeydown = this.handleKeyDown.bind(this);
      document.onkeyup = this.handleKeyUp.bind(this);
    }

    // -----Touch-----

  }, {
    key: 'handleTouchStart',
    value: function handleTouchStart(e) {
      this.lastPosition = this.position;
      this.isMouseDown = true;

      this.callbacks['touchStart'].forEach(function (_ref) {
        var callBack = _ref.callBack;
        return callBack(e);
      });
    }
  }, {
    key: 'handleTouchEnd',
    value: function handleTouchEnd(e) {
      this.lastPosition = this.position;
      this.isMouseDown = false;

      this.callbacks['touchEnd'].forEach(function (_ref2) {
        var callBack = _ref2.callBack;
        return callBack(e);
      });
    }
  }, {
    key: 'handleTouchMove',
    value: function handleTouchMove(e) {
      e.preventDefault();
      this.setPosition(e);
      this.callbacks['touchMove'].forEach(function (_ref3) {
        var callBack = _ref3.callBack;
        return callBack(e);
      });
    }

    // -----Mouse-----

  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      this.lastPosition = this.position;
      this.isMouseDown = true;

      this.callbacks['mouseDown'].forEach(function (_ref4) {
        var callBack = _ref4.callBack;
        return callBack(e);
      });
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(e) {
      this.lastPosition = this.position;
      this.isMouseDown = false;

      this.callbacks['mouseUp'].forEach(function (_ref5) {
        var callBack = _ref5.callBack;
        return callBack(e);
      });
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      this.setPosition(e);
      this.callbacks['mouseMove'].forEach(function (_ref6) {
        var callBack = _ref6.callBack;
        return callBack(e);
      });
    }

    // -----Keypresses------

  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(e) {
      if (!this.pressedKeys.includes(e.keyCode)) this.pressedKeys.push(e.keyCode);

      this.callbacks['keyDown'].forEach(function (_ref7) {
        var callBack = _ref7.callBack;
        return callBack(e);
      });
    }
  }, {
    key: 'handleKeyUp',
    value: function handleKeyUp(e) {
      var index = this.pressedKeys.indexOf(e.keyCode);
      if (index > -1) this.pressedKeys.splice(index, 1);

      this.callbacks['keyUp'].forEach(function (_ref8) {
        var callBack = _ref8.callBack;
        return callBack(e);
      });
    }
  }, {
    key: 'setPosition',
    value: function setPosition(e) {
      if ('clientX' in e) {
        this.position = new _Vector2.default(e.clientX * this.GameState.Canvas.scale, e.clientY * this.GameState.Canvas.scale);
      }

      if ('targetTouches' in e) {
        this.position = new _Vector2.default(e.targetTouches[0].clientX * this.GameState.Canvas.scale, e.targetTouches[0].clientY * this.GameState.Canvas.scale);
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  callbacks: {
    mouseDown: [],
    mouseUp: [],
    mouseMove: [],
    touchStart: [],
    touchEnd: [],
    touchMove: [],
    keyDown: [],
    keyUp: []
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
}

module.exports = bytesToUuid;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gameState = __webpack_require__(19);

var _gameState2 = _interopRequireDefault(_gameState);

var _Level = __webpack_require__(5);

var _Level2 = _interopRequireDefault(_Level);

var _levels = __webpack_require__(20);

var _levels2 = _interopRequireDefault(_levels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);

    this.deltaTime = _gameState2.default.deltaTime;
    this.isPaused = _gameState2.default.isPaused;
    this.level = _gameState2.default.level;
    this.levels = _gameState2.default.levels;
    this.score = _gameState2.default.score;
    this.playerName = _gameState2.default.playerName;
    this.currentLevel = new _Level2.default({ GameState: this });

    /*
      Class variables added in loader :
      - this.Audio
      - this.UI
      - this.Controls
      - this.Canvas
      - this.Scene
      - this.Render
    */
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      this.initLevels();
    }
  }, {
    key: 'initLevels',
    value: function initLevels() {
      var _this = this;

      this.levels = _levels2.default.map(function (level) {
        var lvl = new level({ GameState: _this });
        return lvl;
      });
    }
  }, {
    key: 'loadLevel',
    value: function loadLevel() {
      var newLevel = this.levels[this.level];

      // load level
      newLevel.load();
      this.currentLevel = newLevel;

      // Remove focus from any UI elements clicked to prevent control misdirection
      document.activeElement.blur();
    }
  }, {
    key: 'play',
    value: function play() {
      this.isPaused = false;
      this.loadLevel();
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.endlevel();
      this.play();
    }
  }, {
    key: 'quit',
    value: function quit() {
      this.endlevel();
      this.UI.setScreen('mainmenu');
    }
  }, {
    key: 'togglePause',
    value: function togglePause() {
      this.isPaused = !this.isPaused;

      if (this.isPaused) {
        this.Audio.audioContext.resume();
      }
      if (!this.isPaused) {
        this.Audio.audioContext.suspend();
      }
    }
  }, {
    key: 'endlevel',
    value: function endlevel() {
      this.currentLevel.unload();
      this.isPaused = true;
      this.score = _gameState2.default.score;
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  deltaTime: 1,
  isPaused: true,
  level: 0,
  levels: [],
  playerName: 'Player 1',
  score: 0
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Prototype = __webpack_require__(21);

var _Prototype2 = _interopRequireDefault(_Prototype);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_Prototype2.default];

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Action = __webpack_require__(22);

var _Action2 = _interopRequireDefault(_Action);

var _ActionType = __webpack_require__(7);

var _ActionType2 = _interopRequireDefault(_ActionType);

var _Avatar = __webpack_require__(23);

var _Avatar2 = _interopRequireDefault(_Avatar);

var _cloneClass = __webpack_require__(25);

var _cloneClass2 = _interopRequireDefault(_cloneClass);

var _Deck = __webpack_require__(26);

var _Deck2 = _interopRequireDefault(_Deck);

var _Grid = __webpack_require__(27);

var _Grid2 = _interopRequireDefault(_Grid);

var _Hand = __webpack_require__(28);

var _Hand2 = _interopRequireDefault(_Hand);

var _Level2 = __webpack_require__(5);

var _Level3 = _interopRequireDefault(_Level2);

var _Player = __webpack_require__(30);

var _Player2 = _interopRequireDefault(_Player);

var _randomRange = __webpack_require__(10);

var _randomRange2 = _interopRequireDefault(_randomRange);

var _Tile = __webpack_require__(3);

var _Tile2 = _interopRequireDefault(_Tile);

var _TileType = __webpack_require__(2);

var _TileType2 = _interopRequireDefault(_TileType);

var _v = __webpack_require__(1);

var _v2 = _interopRequireDefault(_v);

var _Vector = __webpack_require__(0);

var _Vector2 = _interopRequireDefault(_Vector);

var _Pathfinder = __webpack_require__(31);

var _Pathfinder2 = _interopRequireDefault(_Pathfinder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Level) {
  _inherits(_class, _Level);

  function _class(config) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, config));

    _this.name = "Prototype Level";
    _this.rows = 6;
    _this.columns = 6;
    _this.currentPlayerTurn = 0;
    _this.selectedTile = null;
    _this.currentAction = null;
    return _this;
  }

  _createClass(_class, [{
    key: 'load',
    value: function load() {
      var _this2 = this;

      this.GameState.Scene.clear();

      // Init deck
      this.deck = new _Deck2.default({
        deckSize: this.rows * this.columns
      });

      // Init players
      this.players = [new _Player2.default({
        GameState: this.GameState,
        name: 'Player 1',
        uuid: (0, _v2.default)(),
        color: 'blue',
        avatar: new _Avatar2.default({
          GameState: this.GameState,
          dimensions: new _Vector2.default(64, 64),
          scale: new _Vector2.default(2, 2),
          offset: new _Vector2.default(0.5, 0.5),
          sprite: './img/Avatar_Test.png'
        })
      }), new _Player2.default({
        GameState: this.GameState,
        name: 'Player 2',
        uuid: (0, _v2.default)(),
        color: 'red',
        avatar: new _Avatar2.default({
          GameState: this.GameState,
          dimensions: new _Vector2.default(64, 64),
          scale: new _Vector2.default(2, 2),
          offset: new _Vector2.default(0.5, 0.5),
          sprite: './img/Avatar_Test_2.png'
        })
      })];

      // Init hands
      this.players.forEach(function (player, index) {
        var hand = new _Hand2.default({
          GameState: _this2.GameState,
          position: new _Vector2.default(0, -_this2.GameState.Canvas.cy)
        });
        // Draw tiles from deck
        for (var i = 0; i < player.handSize - index; i++) {
          hand.add(_this2.deck.draw());
        }

        // Set visibility of hand
        hand.setVisibility(false);
        if (index === _this2.currentPlayerTurn) hand.setVisibility(true);

        player.hand = hand;
        _this2.GameState.Scene.add(hand);
      });

      // Init grid, it automatically adds the tiles to the scene
      this.grid = new _Grid2.default({
        GameState: this.GameState,
        rows: this.rows,
        columns: this.columns,
        minimumPadding: 100,
        players: this.players
      });
      this.grid.init();

      // Init current action
      this.currentAction = new _Action2.default({ player: this.players[this.currentPlayerTurn] });

      // Init Controls
      this.addControlsCallback('mouseDown', this.handleMouseDown.bind(this));
      this.addControlsCallback('mouseUp', this.handleMouseUp.bind(this));
      this.addControlsCallback('mouseMove', this.handleMouseMove.bind(this));
    }
  }, {
    key: 'handleMouseDown',
    value: function handleMouseDown(e) {
      var clickedTile = this.findTileAtPosition(this.GameState.Controls.position);
      if (!clickedTile) return;

      this.selectTile(clickedTile);
    }
  }, {
    key: 'handleMouseUp',
    value: function handleMouseUp(e) {
      var clickedTile = this.findTileAtPosition(this.GameState.Controls.position);
      if (!clickedTile) {
        this.deselectTile();
        return;
      }

      this.currentAction.targetTile = clickedTile;

      if (clickedTile.tileType.type === 'EMPTY' && this.selectedTile.isInHand) {
        this.currentAction.actionType = new _ActionType2.default('PLACE');
        this.currentAction.commit();
        this.cycleActions();
      }

      if (clickedTile.tileType.type === 'PLAYER_COLUMN' && this.selectedTile.tileType.type === 'PLAYER_COLUMN' && clickedTile.uuid !== this.selectedTile.uuid) {
        this.currentAction.actionType = new _ActionType2.default('MOVE');
        this.currentAction.commit();
        this.cycleActions();
      }

      if (clickedTile.tileType.type !== 'PLAYER_COLUMN' && clickedTile.tileType.type !== 'EMPTY' && this.selectedTile && this.selectedTile.uuid === clickedTile.uuid) {
        // TODO: enable a rotation mode which shows icons to rotate left and right
        this.currentAction.actionType = new _ActionType2.default('ROTATE');
        this.currentAction.commit();
        if (!clickedTile.isInHand) this.cycleActions();
      }

      this.deselectTile();
    }
  }, {
    key: 'handleMouseMove',
    value: function handleMouseMove(e) {
      if (!this.previewTile) return;

      this.previewTile.canvasPosition = this.GameState.Controls.position;
    }
  }, {
    key: 'findTileAtPosition',
    value: function findTileAtPosition(pos) {
      // Search grid
      var clickedTile = this.grid.getCellAtCanvasPosition(pos);

      // Then search hand
      if (!clickedTile) {
        clickedTile = this.players[this.currentPlayerTurn].hand.getCellAtCanvasPosition(pos);
      }

      return clickedTile;
    }
  }, {
    key: 'deselectTile',
    value: function deselectTile() {
      if (this.previewTile) this.GameState.Scene.remove(this.previewTile.uuid);
      this.selectedTile = null;
      this.lastSelectedTile = null;
      this.previewTile = null;
    }
  }, {
    key: 'selectTile',
    value: function selectTile(tileToSelect) {
      this.selectedTile = tileToSelect;
      this.currentAction.sourceTile = this.selectedTile;

      if (tileToSelect.isInHand || tileToSelect.tileType.type === 'PLAYER_COLUMN') {
        this.previewTile = (0, _cloneClass2.default)(tileToSelect);
        this.previewTile.alpha = 0.75;
        this.GameState.Scene.add(this.previewTile);
      }
    }
  }, {
    key: 'cycleActions',
    value: function cycleActions() {
      this.processConnection();

      // Decrement action
      this.players[this.currentPlayerTurn].actions -= 1;
      if (this.players[this.currentPlayerTurn].actions <= 0) {
        // Reset player actions to max
        this.players[this.currentPlayerTurn].actions = this.players[this.currentPlayerTurn].maxActions;
        // Cycle turns
        this.cyclePlayerTurn();
      }

      // Reset currrent action
      this.currentAction = new _Action2.default({ player: this.players[this.currentPlayerTurn] });

      // Update UI
      this.GameState.UI.updatePlayerStats(this.players);
    }
  }, {
    key: 'cyclePlayerTurn',
    value: function cyclePlayerTurn() {
      // Hide old hand
      this.players[this.currentPlayerTurn].hand.setVisibility(false);

      // Increment turn
      this.currentPlayerTurn++;
      if (this.currentPlayerTurn >= this.players.length) this.currentPlayerTurn = 0;

      //Show new hand
      this.players[this.currentPlayerTurn].hand.setVisibility(true);

      // Draw new tile
      if (this.deck.tiles.length > 0) this.players[this.currentPlayerTurn].hand.add(this.deck.draw());
    }
  }, {
    key: 'processConnection',
    value: function processConnection() {
      var _this3 = this;

      // vvv There must be a better way to get these cells vvv
      var startCell = this.grid.tiles.find(function (tile) {
        return tile.player && tile.player.name === _this3.players[_this3.currentPlayerTurn].name;
      });
      var endCell = this.grid.tiles.find(function (tile) {
        return tile.player && tile.player.name !== _this3.players[_this3.currentPlayerTurn].name;
      });
      var pathfinder = new _Pathfinder2.default(this.grid.tiles);
      var path = pathfinder.findPath(startCell, endCell);

      if (path.length > 0) {
        var damageAmplifier = 0;

        path.forEach(function (tile) {
          // Animate Tiles in path by resetting frame to 0
          tile.currentFrame = 0;

          //Increase Damage by 1 for every cell in path placed by the attacker
          if (tile.placedBy.name === startCell.player.name) damageAmplifier += 1;
        });

        // Apply Damage
        endCell.player.health -= startCell.player.damage + damageAmplifier;
      }

      this.endGameLogic();
    }
  }, {
    key: 'endGameLogic',
    value: function endGameLogic() {
      var gameOver = false;

      this.players.forEach(function (player) {
        if (player.health <= 0) {
          gameOver = true;
          player.health = 0;
        }
      });

      if (gameOver) {
        this.winner = this.players.find(function (player) {
          return player.health > 0;
        });
        this.GameState.UI.updateScoreScreen();
        this.GameState.UI.setScreen('score');
      }
    }
  }]);

  return _class;
}(_Level3.default);

exports.default = _class;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ActionType = __webpack_require__(7);

var _ActionType2 = _interopRequireDefault(_ActionType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(_ref) {
    var _ref$type = _ref.type,
        type = _ref$type === undefined ? new _ActionType2.default('ROTATE') : _ref$type,
        _ref$targetTile = _ref.targetTile,
        targetTile = _ref$targetTile === undefined ? null : _ref$targetTile,
        _ref$sourceTile = _ref.sourceTile,
        sourceTile = _ref$sourceTile === undefined ? null : _ref$sourceTile,
        _ref$player = _ref.player,
        player = _ref$player === undefined ? null : _ref$player;

    _classCallCheck(this, _class);

    this.actionType = type;
    this.targetTile = targetTile;
    this.sourceTile = sourceTile;
    this.player = player;
  }

  _createClass(_class, [{
    key: 'rotate',
    value: function rotate() {
      this.targetTile.rotateCell(1);
      // Change ownership of tile on rotate
      this.targetTile.placedBy = this.player;
    }
  }, {
    key: 'place',
    value: function place() {
      this.targetTile.setType(this.sourceTile.tileType);
      this.targetTile.rotation = this.sourceTile.rotation;
      this.targetTile.neighborPattern = this.sourceTile.neighborPattern;
      this.targetTile.neighbors = this.targetTile.getNeighbors();
      this.targetTile.placedBy = this.player;
      this.player.hand.remove(this.sourceTile.uuid);
    }
  }, {
    key: 'move',
    value: function move() {
      this.targetTile.player = this.sourceTile.player;
      this.sourceTile.player = null;
      this.targetTile.player.setAvatarPosition(this.targetTile);
    }
  }, {
    key: 'commit',
    value: function commit() {
      switch (this.actionType.type) {
        case 'MOVE':
          this.move();
          break;
        case 'PLACE':
          this.place();
          break;
        case 'ROTATE':
          this.rotate();
          break;
      }
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sprite2 = __webpack_require__(8);

var _Sprite3 = _interopRequireDefault(_Sprite2);

var _Vector = __webpack_require__(0);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Sprite) {
  _inherits(_class, _Sprite);

  function _class(config) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, config));

    var sprite = config.sprite;


    _this.animations = {
      exist: {
        frames: 1,
        spriteSheet: sprite,
        ticksPerFrame: 10
      }
    };
    _this.currentAnimation = 'exist';
    return _this;
  }

  return _class;
}(_Sprite3.default);

exports.default = _class;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Vector = __webpack_require__(0);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (GameState, position) {
  return new _Vector2.default(position.x + GameState.Canvas.width / 2, GameState.Canvas.height - (position.y + GameState.Canvas.height / 2));
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (orig) {
  return Object.assign(Object.create(Object.getPrototypeOf(orig)), orig);
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TileType = __webpack_require__(2);

var _TileType2 = _interopRequireDefault(_TileType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(_ref) {
    var _ref$deckSize = _ref.deckSize,
        deckSize = _ref$deckSize === undefined ? 30 : _ref$deckSize;

    _classCallCheck(this, _class);

    this.tiles = [];
    this.tilesPerType = Math.floor(deckSize / 4);
    this.typeCounter = 0;
    this.currentType = 0;
    this.allowedTypes = ['STRAIGHT', 'BEND', 'TRIPLE', 'QUAD'];

    for (var i = 0; i < deckSize; i++) {
      this.tiles.push(new _TileType2.default(this.allowedTypes[this.currentType]));
      this.incrementType();
    }

    this.shuffle();
  }

  _createClass(_class, [{
    key: 'incrementType',
    value: function incrementType() {
      this.typeCounter++;
      if (this.typeCounter >= this.tilesPerType) {
        this.typeCounter = 0;
        this.currentType += 1;
        if (this.currentType >= this.allowedTypes.length) this.currentType = 0;
      }
    }
  }, {
    key: 'shuffle',
    value: function shuffle() {
      for (var i = this.tiles.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var _ref2 = [this.tiles[j], this.tiles[i]];
        this.tiles[i] = _ref2[0];
        this.tiles[j] = _ref2[1];
      }
    }
  }, {
    key: 'draw',
    value: function draw() {
      return this.tiles.pop();
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randomRange = __webpack_require__(10);

var _randomRange2 = _interopRequireDefault(_randomRange);

var _Tile = __webpack_require__(3);

var _Tile2 = _interopRequireDefault(_Tile);

var _TileType = __webpack_require__(2);

var _TileType2 = _interopRequireDefault(_TileType);

var _Vector = __webpack_require__(0);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(config) {
    _classCallCheck(this, _class);

    var GameState = config.GameState,
        _config$rows = config.rows,
        rows = _config$rows === undefined ? 6 : _config$rows,
        _config$columns = config.columns,
        columns = _config$columns === undefined ? 6 : _config$columns,
        _config$minimumPaddin = config.minimumPadding,
        minimumPadding = _config$minimumPaddin === undefined ? 50 : _config$minimumPaddin,
        players = config.players;


    this.GameState = GameState;
    this.rows = rows;
    this.columns = columns + 2; // add 2 empty columns for player position
    this.maxRowsOrColumns = Math.max(this.rows, this.columns);
    this.minimumPadding = minimumPadding;
    this.tiles = [];
    this.players = players;
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      var _this = this;

      // Calculations
      this.minDimension = Math.min(this.GameState.Canvas.width, this.GameState.Canvas.height);
      this.cellSize = (this.minDimension - this.minimumPadding) / this.maxRowsOrColumns;
      this.padding = new _Vector2.default((this.GameState.Canvas.width - this.cellSize * this.columns) / 2, (this.GameState.Canvas.height - this.cellSize * this.rows) / 2);

      // Build grid
      for (var y = 0; y < this.rows; y++) {
        for (var x = 0; x < this.columns; x++) {
          var type = new _TileType2.default('EMPTY');
          if (x === 0 || x === this.columns - 1) type = new _TileType2.default('PLAYER_COLUMN');
          this.addCell(x, y, type);
        }
      }

      // Position avatars
      this.players.forEach(function (player, index) {
        var tileID = (index === 0 ? 0 : _this.columns - 1) + '_' + Math.floor((0, _randomRange2.default)(0, _this.rows - 1));
        var tile = _this.tiles.find(function (tile) {
          return tile.id === tileID;
        });

        tile.player = player;
        player.setAvatarPosition(tile);
      });

      // Init cells
      this.tiles.forEach(function (cell) {
        cell.init(_this.tiles);
      });

      //Position and init Avatars
      this.players.forEach(function (player) {
        player.setAvatarPosition(player.avatar, player.avatar.x, player.avatar.y);
        _this.GameState.Scene.add(player.avatar);
      });
    }
  }, {
    key: 'addCell',
    value: function addCell(x, y, type) {
      var cell = new _Tile2.default({
        GameState: this.GameState,
        dimensions: new _Vector2.default(64, 64),
        offset: new _Vector2.default(0.5, 0.5),
        scale: new _Vector2.default(this.cellSize / 64, this.cellSize / 64),
        id: x + '_' + y,
        x: x,
        y: y,
        type: type
      });
      cell.canvasPosition = new _Vector2.default(x * this.cellSize + this.padding.x + this.cellSize / 2, y * this.cellSize + this.padding.y + this.cellSize / 2);

      this.GameState.Scene.add(cell);
      this.tiles.push(cell);
    }
  }, {
    key: 'getCellAtCanvasPosition',
    value: function getCellAtCanvasPosition(position) {
      var x = Math.floor((position.x - this.padding.x) / this.cellSize);
      var y = Math.floor((position.y - this.padding.y) / this.cellSize);
      return this.tiles.find(function (cell) {
        return cell.id === x + '_' + y;
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Entity2 = __webpack_require__(9);

var _Entity3 = _interopRequireDefault(_Entity2);

var _rectContains = __webpack_require__(29);

var _rectContains2 = _interopRequireDefault(_rectContains);

var _Tile = __webpack_require__(3);

var _Tile2 = _interopRequireDefault(_Tile);

var _v = __webpack_require__(1);

var _v2 = _interopRequireDefault(_v);

var _Vector = __webpack_require__(0);

var _Vector2 = _interopRequireDefault(_Vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Entity) {
  _inherits(_class, _Entity);

  function _class(config) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, config));

    _this.tiles = [];
    _this.selectedTile = 0;
    _this.size = 64;
    _this.scale = 2;
    _this.paddingRatio = 0.2;
    return _this;
  }

  _createClass(_class, [{
    key: 'add',
    value: function add(tileType) {
      var tile = new _Tile2.default({
        GameState: this.GameState,
        dimensions: new _Vector2.default(this.size, this.size),
        offset: new _Vector2.default(0.5, 0.5),
        scale: new _Vector2.default(this.scale, this.scale),
        type: tileType,
        isVisible: false,
        isInHand: true
      });

      tile.uuid = (0, _v2.default)();
      this.tiles.push(tile);
      this.updatePosition();
    }
  }, {
    key: 'remove',
    value: function remove(uuid) {
      this.tiles = this.tiles.filter(function (el) {
        return el.uuid !== uuid;
      });
      this.updatePosition();
    }
  }, {
    key: 'updatePosition',
    value: function updatePosition() {
      var _this2 = this;

      var offsetX = this.tiles.length * this.size * this.scale / 2;
      this.tiles.forEach(function (tile, index) {
        tile.canvasPosition = new _Vector2.default(_this2.GameState.Canvas.cx + index * _this2.size * (_this2.scale + _this2.paddingRatio) - offsetX, _this2.GameState.Canvas.height - _this2.size * _this2.scale / 2);
      });
    }
  }, {
    key: 'load',
    value: function load() {
      this.tiles.forEach(function (tile) {
        tile.load();
      });
    }
  }, {
    key: 'drawEntity',
    value: function drawEntity() {
      this.tiles.forEach(function (tile) {
        tile.drawEntity();
      });
    }
  }, {
    key: 'setVisibility',
    value: function setVisibility(isVisible) {
      this.tiles.forEach(function (tile) {
        tile.isVisible = isVisible;
      });
    }
  }, {
    key: 'getCellAtCanvasPosition',
    value: function getCellAtCanvasPosition(position) {
      return this.tiles.find(function (tile) {
        return (0, _rectContains2.default)(position, new _Vector2.default(tile.canvasPosition.x + tile.absoluteOffset.x, tile.canvasPosition.y + tile.absoluteOffset.y), new _Vector2.default(tile.dimensions.x * tile.scale.x, tile.dimensions.y * tile.scale.y));
      });
    }
  }]);

  return _class;
}(_Entity3.default);

exports.default = _class;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (point, rectPos, rectDim) {
  return rectPos.x <= point.x && point.x <= rectPos.x + rectDim.x && rectPos.y <= point.y && point.y <= rectPos.y + rectDim.y;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(_ref) {
    var GameState = _ref.GameState,
        _ref$actions = _ref.actions,
        actions = _ref$actions === undefined ? 2 : _ref$actions,
        avatar = _ref.avatar,
        _ref$color = _ref.color,
        color = _ref$color === undefined ? 'blue' : _ref$color,
        _ref$controller = _ref.controller,
        controller = _ref$controller === undefined ? 'human' : _ref$controller,
        _ref$damage = _ref.damage,
        damage = _ref$damage === undefined ? 0 : _ref$damage,
        _ref$hand = _ref.hand,
        hand = _ref$hand === undefined ? [] : _ref$hand,
        _ref$handSize = _ref.handSize,
        handSize = _ref$handSize === undefined ? 4 : _ref$handSize,
        _ref$health = _ref.health,
        health = _ref$health === undefined ? 20 : _ref$health,
        _ref$maxActions = _ref.maxActions,
        maxActions = _ref$maxActions === undefined ? 2 : _ref$maxActions,
        _ref$maxHealth = _ref.maxHealth,
        maxHealth = _ref$maxHealth === undefined ? 20 : _ref$maxHealth,
        _ref$name = _ref.name,
        name = _ref$name === undefined ? 'Player 1' : _ref$name;

    _classCallCheck(this, _class);

    this.GameState = GameState;
    this.actions = actions;
    this.avatar = avatar;
    this.color = color;
    this.controller = controller;
    this.damage = damage;
    this.hand = hand;
    this.handSize = handSize;
    this.health = health;
    this.maxActions = maxActions;
    this.maxHealth = maxHealth;
    this.name = name;
  }

  _createClass(_class, [{
    key: 'setAvatarPosition',
    value: function setAvatarPosition(tile) {
      this.avatar.canvasPosition = tile.canvasPosition;
      this.avatar.calculateOffset();
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PriorityQueue = __webpack_require__(32);

var _PriorityQueue2 = _interopRequireDefault(_PriorityQueue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(grid) {
    _classCallCheck(this, _class);

    this.grid = grid;

    this.startCell = null;
    this.endCell = null;
    this.frontier = new _PriorityQueue2.default();
    this.pathFound = false;
    this.hasSearched = {};

    this.grid.forEach(function (tile) {
      delete tile.cameFrom;
    });
  }

  _createClass(_class, [{
    key: 'findPath',
    value: function findPath(startCell, endCell) {
      this.startCell = startCell;
      this.endCell = endCell;
      this.hasSearched[startCell.id] = true;
      this.frontier.enqueue(startCell, 1);

      var breaker = 0;
      var breakerLimit = 100;
      while (!this.pathFound && this.frontier.items.length > 0) {
        breaker++;
        if (breaker > breakerLimit) break;

        for (var i = 0; i < this.frontier.items.length; i++) {
          this.getFrontier();
        }
      }

      return this.buildPath();
    }
  }, {
    key: 'isPassable',
    value: function isPassable(neighbor) {
      return (neighbor.tileType.type !== 'PLAYER_COLUMN' || neighbor.player) && neighbor.tileType.type !== 'EMPTY';
    }
  }, {
    key: 'isConnected',
    value: function isConnected(cell, neighbor) {
      // vv this one checks if the neighbor has a connection to the cell, it has to be a 2 way connection vv
      return neighbor.neighbors.find(function (neighborNeighbor) {
        if (!neighborNeighbor) return false;
        return neighborNeighbor.uuid === cell.uuid;
      });
    }
  }, {
    key: 'getFrontier',
    value: function getFrontier() {
      var _this = this;

      var cell = this.frontier.dequeue();

      cell.neighbors.forEach(function (neighbor) {
        if (!neighbor) return;
        if (neighbor.uuid === _this.endCell.uuid) _this.pathFound = true;

        if (!_this.hasSearched[neighbor.id] && _this.isPassable(neighbor) && _this.isConnected(cell, neighbor)) {
          _this.hasSearched[neighbor.id] = true;
          neighbor.cameFrom = cell;
          _this.frontier.enqueue(neighbor, 1);
        }
      });
    }
  }, {
    key: 'buildPath',
    value: function buildPath() {
      var path = [this.endCell];
      var breakerLimit = 100;
      var breaker = 0;
      var pathBuilt = false;

      while (pathBuilt === false) {
        breaker++;
        if (breaker > breakerLimit) break;

        var newestEntry = path[path.length - 1].cameFrom;
        if (!newestEntry) break;

        path.push(newestEntry);
      }

      return this.pathFound ? path : [];
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);

    this.items = [];
  }

  _createClass(_class, [{
    key: "enqueue",
    value: function enqueue(element, priority) {
      var contain = false;
      for (var i = 0; i < this.items.length; i++) {
        if (this.items[i].priority > element.priority) {
          this.items.splice(i, 0, element);
          contain = true;
          break;
        }
      }

      if (!contain) this.items.push(element);
    }
  }, {
    key: "dequeue",
    value: function dequeue() {
      if (this.items.length == 0) return;
      return this.items.shift();
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(GameState) {
    _classCallCheck(this, _class);

    this.GameState = GameState;
    this.isRunning = false;
  }

  _createClass(_class, [{
    key: "init",
    value: function init() {
      if (!this.isRunning) {
        this.isRunning = true;
        this.render();
      };
    }
  }, {
    key: "shouldRender",
    value: function shouldRender() {
      return !this.GameState.isPaused;
    }
  }, {
    key: "render",
    value: function render() {
      // Request new frame
      if (this.isRunning) window.requestAnimationFrame(this.render.bind(this));

      // Bail out early
      if (!this.shouldRender()) return;

      // Clear screen
      this.GameState.Canvas.clear();

      // Draw Entities
      this.GameState.Scene.gameObjects.forEach(function (entity) {
        return entity.drawEntity();
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _v = __webpack_require__(1);

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(GameState) {
    _classCallCheck(this, _class);

    this.GameState = GameState;
    this.gameObjects = [];
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {}
  }, {
    key: 'add',
    value: function add(gameObject) {
      gameObject.uuid = (0, _v2.default)();
      gameObject.load();
      this.gameObjects.push(gameObject);
      return gameObject.uuid;
    }
  }, {
    key: 'remove',
    value: function remove(uuid) {
      var gameObject = this.gameObjects.find(function (el) {
        return el.uuid === uuid;
      });
      gameObject.unload();
      this.gameObjects = this.gameObjects.filter(function (el) {
        return el.uuid !== uuid;
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.gameObjects = [];
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(GameState) {
    _classCallCheck(this, _class);

    this.GameState = GameState;
    this.screens = document.querySelectorAll('[data-screen]');
    this.buttons = {
      fullscreen: document.querySelectorAll('[data-gamestate-fullscreen]'),
      initAudio: document.querySelectorAll('[data-gamestate-init-audio]'),
      level: document.querySelectorAll('[data-gamestate-change-level]'),
      mute: document.querySelectorAll('[data-gamestate-mute]'),
      pause: document.querySelectorAll('[data-gamestate-pause]'),
      play: document.querySelectorAll('[data-gamestate-play]'),
      quit: document.querySelectorAll('[data-gamestate-quit]'),
      restart: document.querySelectorAll('[data-gamestate-restart]'),
      screens: document.querySelectorAll('[data-ui-target-screen]')
    };
    this.isFullscreen = false;
  }

  _createClass(_class, [{
    key: 'init',
    value: function init() {
      this.initListenters();
      this.setScreen('mainmenu');
      this.updateLevel(this.GameState.levels[this.GameState.level].name);
    }
  }, {
    key: 'initListenters',
    value: function initListenters() {
      var _this = this;

      // Init audio on user input
      Array.from(this.buttons.initAudio).forEach(function (button) {
        button.addEventListener('click', function () {
          if (!_this.GameState.Audio.isInitialized) _this.GameState.Audio.init();
        });
      });

      // Play buttons
      Array.from(this.buttons.play).forEach(function (button) {
        button.addEventListener('click', function () {
          return _this.GameState.play();
        });
      });

      // Pause buttons
      Array.from(this.buttons.pause).forEach(function (button) {
        button.addEventListener('click', function () {
          return _this.GameState.togglePause();
        });
      });

      // Restart Buttons
      Array.from(this.buttons.restart).forEach(function (button) {
        button.addEventListener('click', function () {
          return _this.GameState.restart();
        });
      });

      //Fullscreen buttons
      Array.from(this.buttons.fullscreen).forEach(function (button) {
        button.addEventListener('click', function () {
          return _this.toggleFullscreen();
        });
      });

      //Level selection buttons
      Array.from(this.buttons.level).forEach(function (button) {
        button.addEventListener('click', function (e) {
          _this.GameState.level += parseInt(e.target.dataset.gamestateChangeLevel, 10);
          if (_this.GameState.level >= _this.GameState.levels.length) _this.GameState.level = 0;
          if (_this.GameState.level < 0) _this.GameState.level = _this.GameState.levels.length - 1;

          _this.updateLevel(_this.GameState.levels[_this.GameState.level].name);
        });
      });

      // Quit buttons
      Array.from(this.buttons.quit).forEach(function (button) {
        button.addEventListener('click', function () {
          return _this.GameState.quit();
        });
      });

      // Mute Buttons
      Array.from(this.buttons.mute).forEach(function (button) {
        button.addEventListener('click', function (e) {
          return _this.GameState.Audio.toggleMute();
        });
      });

      // UI Screen Transitions
      Array.from(this.buttons.screens).forEach(function (button) {
        button.addEventListener('click', _this.initTransitions.bind(_this));
      });
    }
  }, {
    key: 'initTransitions',
    value: function initTransitions(e) {
      this.setScreen(e.target.dataset.uiTargetScreen);
    }
  }, {
    key: 'setScreen',
    value: function setScreen(screenToSet) {
      Array.from(this.screens).forEach(function (screen) {
        if (screen.dataset.screen === screenToSet) {
          screen.classList.add('active');
        } else {
          screen.classList.remove('active');
        }
      });
    }
  }, {
    key: 'toggleFullscreen',
    value: function toggleFullscreen() {
      var elem = document.documentElement;

      /* View in fullscreen */
      if (!this.isFullscreen) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
          /* Firefox */
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
          /* Chrome, Safari and Opera */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          /* IE/Edge */
          elem.msRequestFullscreen();
        }
      }

      /* Close fullscreen */
      if (this.isFullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          /* Firefox */
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          /* Chrome, Safari and Opera */
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          /* IE/Edge */
          document.msExitFullscreen();
        }
      }

      this.isFullscreen = !this.isFullscreen;
    }
  }, {
    key: 'updatePlayerStats',
    value: function updatePlayerStats(players) {
      var _this2 = this;

      if (!players) return;

      players.forEach(function (player, index) {
        var name = document.querySelector('[data-ui-player="' + (index + 1) + '"] [data-ui="name"]');
        var health = document.querySelector('[data-ui-player="' + (index + 1) + '"] [data-ui="health"]');
        var damage = document.querySelector('[data-ui-player="' + (index + 1) + '"] [data-ui="damage"]');
        var actions = document.querySelector('[data-ui-player="' + (index + 1) + '"] [data-ui="actions"]');
        name.innerHTML = '' + player.name + (_this2.GameState.currentLevel.currentPlayerTurn === index ? '*' : '');
        health.innerHTML = 'HP: ' + player.health + '/' + player.maxHealth;
        damage.innerHTML = 'DMG: ' + player.damage;
        actions.innerHTML = 'ACT: ' + player.actions + '/' + player.maxActions;
      });
    }
  }, {
    key: 'updateLevel',
    value: function updateLevel(level) {
      if (!level) return;

      Array.from(document.querySelectorAll('[data-ui="level"]')).forEach(function (levelElement) {
        levelElement.innerHTML = level;
      });
    }
  }, {
    key: 'updateScoreScreen',
    value: function updateScoreScreen() {
      if (!this.GameState.currentLevel.winner) return;
      var winner = document.querySelector('[data-ui="winner"]');
      winner.innerHTML = this.GameState.currentLevel.winner.name + ' Wins!';
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(GameState) {
    _classCallCheck(this, _class);

    this.GameState = GameState;
    this.isRunning = false;
    this.lastUpdate = Date.now();
    this.updateRate = 10;
  }

  _createClass(_class, [{
    key: "init",
    value: function init() {
      if (!this.isRunning) {
        this.isRunning = true;
        this.update();
      };
    }
  }, {
    key: "calculateDeltaTime",
    value: function calculateDeltaTime() {
      var now = Date.now();
      this.GameState.deltaTime = now - this.lastUpdate;
      this.lastUpdate = now;
    }
  }, {
    key: "shouldUpdate",
    value: function shouldUpdate() {
      return !this.GameState.isPaused;
    }
  }, {
    key: "update",
    value: function update() {
      // Request new frame
      if (this.isRunning) window.setTimeout(this.update.bind(this), this.updateRate);

      // Bail out early
      if (!this.shouldUpdate()) return;

      // Calculations
      this.calculateDeltaTime();

      // Handle Level specific game logic
      this.GameState.levels[this.GameState.level].gameLogic();

      // Handle Entity Update
      this.GameState.Scene.gameObjects.forEach(function (entity) {
        return entity.update();
      });
    }
  }]);

  return _class;
}();

exports.default = _class;

/***/ })
/******/ ]);
});