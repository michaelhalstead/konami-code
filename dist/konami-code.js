'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KonamiCode = function () {
  function KonamiCode(callback) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      requireStart: false,
      maxInputWindow: 4000
    };

    _classCallCheck(this, KonamiCode);

    this.code = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
    this.index = 0;
    this.callback = callback;

    // Bind methods
    this.handleSuccess = this.handleSuccess.bind(this);
    this.init.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.withinInputWindow = this.withinInputWindow.bind(this);

    this.init(config);
  }

  _createClass(KonamiCode, [{
    key: 'handleSuccess',
    value: function handleSuccess() {
      this.callback();
      this.index = 0;
    }
  }, {
    key: 'init',
    value: function init(config) {
      // Validate config + callback
      if (config.maxInputWindow && typeof config.maxInputWindow !== 'number') {
        throw new Error('maxInputWindow must be a number');
      }

      if (config.requireStart && typeof config.requireStart !== 'boolean') {
        throw new Error('requireStart must be a boolean');
      }

      if (this.callback && typeof this.callback !== 'function') {
        throw new Error('callback must be a function');
      }

      // If config is valid, set values and add event listener
      this.maxInputWindow = config.maxInputWindow || 10000;

      if (config.requireStart) {
        this.code.push('enter');
      }

      window.addEventListener('keyup', this.onKeyDown.bind(this));
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(event) {
      var keyPressed = event.key.toLowerCase();

      if (this.index === 0) {
        this.inputStarted = Number(new Date());
      }

      /* If the characters at the same index don't match OR if more than maxInputWindow ms have elapsed, reset */
      if (this.code[this.index] !== keyPressed || !this.withinInputWindow()) {
        return this.index = 0;
      }

      /* If the index is the same as the length, we have a match! If not, increment index. */
      this.index === this.code.length - 1 ? this.handleSuccess() : this.index++;
    }
  }, {
    key: 'withinInputWindow',
    value: function withinInputWindow() {
      return new Date() - this.inputStarted <= this.maxInputWindow;
    }
  }]);

  return KonamiCode;
}();