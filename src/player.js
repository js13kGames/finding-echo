
import EventEmitter from 'event-emitter-es6';
import Vector from './vector';

class Player extends EventEmitter {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.w = 4;
    this.h = 3;
    this.movement = new Vector(0, 0);

    this.on('collision', this.onCollision.bind(this));
  }

  move(x, y) {
    this.movement = new Vector(x, y);
  }

  update() {
    if (this.movement.x > 0) this.x += this.movement.x;
    if (this.movement.y > 0) this.y += this.movement.y;
  }

  onCollision() {
    this.movement = new Vector(0, 0);
    this.x -= 1;
    this.y -= 1;
  }
}

export default Player;
