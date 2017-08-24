
/**
 * Local private frames per second
 * @type Number
 * @private
 */
const FPS = 60;

/**
 * Local private miliseconds per frame
 * @type Number
 * @private
 */
const millisecondsPerFrame = 1000 / FPS;

export default {

  /**
   * The number of milliseconds for each frame should be based on
   * the fps
   * @type Number
   */
  millisecondsPerFrame: millisecondsPerFrame,

  /**
   * The number of milliseconds for each frame should be based on
   * the fps
   * @type Date
   */
  previousTime: 0,

  /**
   * The lag since the last loop completion, used to determine whether
   * to update more until the next draw.
   * @type Boolean
   */
  lag: 0,

  /**
   * The total frames run since the first call.
   * @type Number
   */
  frame: 0,
  /**
   * Whether the game is currently running or not, used to actually
   * stop the loop.
   * @type Boolean
   */
  isRunning: false,

  /**
   * The ID of the animation frame, returned from requestAnimationFrame.
   * @type Number
   */
  requestId: 0,

  _onConstantlyRunners: [],
  _onEveryFrameRunners: [],

  /**
   * Moves the game forward by one tick. Will call update continually if
   * lag is larger or equal to milliseconds per frame. Will call draw
   * at the end of every loop and will update total frames.
   */
  tick: () => {
    const currentTime = (new Date()).getTime();
    const elapsed = currentTime - this.previousTime;

    this.previousTime = currentTime;
    this.lag += elapsed;

    while (this.lag >= millisecondsPerFrame) {
      this._runConstantly();
      this.lag -= millisecondsPerFrame;
    }
    this._runEveryFrame(this.lag / millisecondsPerFrame);
    this.frame++;
  },

  /**
   * Runs the game if not already running, runs the loop with launchLoop.
   */
  run: () => {
    if (!this.isRunning) {
      this.launchLoop();
      this.isRunning = true;
    }
  },

  /**
   * Creates a loop that runs tick by request animation frames. Will
   * check the isRunning boolean to see if it should continue running.
   * Initializes previousTime and lag.
   */
  launchLoop: () => {
    this.previousTime = (new Date()).getTime();
    this.lag = 0;

    const runner = () => {
      this.tick();
      if (this.isRunning) {
        this.requestId = requestAnimationFrame(runner);
      }
    };
    runner();
  },

  /**
   * Stops the game by changing the isRunning variable.
   */
  stop: () => {
    this.isRunning = false;
  },

  /**
   * Update function should be overwritten
   */
  update: () => {
    if (this.frame > 100) {
      this.stop();
    }
  },

  _runConstantly: () => {
    this.onConstantlyRunners.forEach(runner => {
      runner();
    });
  },

  /**
   * Run some function constantly in the loop
   * @type Function
   */
  onConstantly: (runner) => {
    this.onConstantlyRunners.push(runner);
  },

  _runEveryFrame: (offset) => {
    this.onEveryFrameRunners.forEach(runner => {
      runner(offset);
    });
  },

  /**
   * Run some function every 60 fps animation frame
   * @type Function
   */
  onEveryFrame: (runner) => {
    this.onEveryFrameRunners.push(runner);
  }
};
