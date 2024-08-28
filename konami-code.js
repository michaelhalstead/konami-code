class KonamiCode {
  constructor(
    callback,
    config = {
      requireStart: false,
      maxInputWindow: 4000,
      onlyAllowOnce: false
    },
  ) {
    this.code = [
      'arrowup',
      'arrowup',
      'arrowdown',
      'arrowdown',
      'arrowleft',
      'arrowright',
      'arrowleft',
      'arrowright',
      'b',
      'a',
    ];
    this.index = 0;
    this.callback = callback;
    this.config = config;

    // Bind methods
    this.handleSuccess = this.handleSuccess.bind(this);
    this.init = this.init.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.withinInputWindow = this.withinInputWindow.bind(this);

    this.init();
  }

  handleSuccess() {
    this.callback();
    this.index = 0;

    if (this.config.onlyAllowOnce === true) {
      window.removeEventListener('keyup', this.onKeyDown);
    }
  }

  init() {
    const { maxInputWindow, requireStart } = this.config;
    // Validate config + callback
    if (maxInputWindow && typeof maxInputWindow !== 'number') {
      throw new Error('maxInputWindow must be a number');
    }

    if (requireStart && typeof requireStart !== 'boolean') {
      throw new Error('requireStart must be a boolean');
    }

    if (this.callback && typeof this.callback !== 'function') {
      throw new Error('callback must be a function');
    }

    // If config is valid, set values and add event listener
    this.maxInputWindow = maxInputWindow || 10000;

    if (requireStart) {
      this.code.push('enter');
    }

    window.addEventListener('keyup', this.onKeyDown);
  }

  onKeyDown(event) {
    const keyPressed = event.key.toLowerCase();

    if (this.index === 0) {
      this.inputStarted = Number(new Date());
    }

    /* If the characters at the same index don't match OR if more than maxInputWindow ms have elapsed, reset */
    if (this.code[this.index] !== keyPressed || !this.withinInputWindow()) {
      return (this.index = 0);
    }

    /* If the index is the same as the length, we have a match! If not, increment index. */
    this.index === this.code.length - 1 ? this.handleSuccess() : this.index++;
  }

  withinInputWindow() {
    return new Date() - this.inputStarted <= this.maxInputWindow;
  }
}
