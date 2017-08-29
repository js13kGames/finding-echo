
import EventEmitter from 'event-emitter-es6';
import KeyboardInit from './keyboard';
import Vector from './vector';

const KEM = KeyboardInit(window);

class Player extends EventEmitter {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.w = 4;
    this.h = 3;
    this.movement = new Vector(0, 0);
    this.angle = (this.w > this.h) ? 0 : 90;

    this.on('collision', this.onCollision.bind(this));
    // TODO Figure out way to not have this dep
    KEM.on('KEYDOWN', this.move.bind(this, 0.25, 0));
  }

  move(x, y) {
    this.movement = new Vector(x, y);
    console.log('movement', this.movement);
  }

  rotate(angle) {
    this.angle = angle;
  }

  update() {
    if (this.movement.x > 0) this.x += this.movement.x;
    if (this.movement.y > 0) this.y += this.movement.y;
  }

  onCollision(entityB) {
    console.log('collision', entityB);
    this.movement = new Vector(0, 0);
    if (entityB.orientation === 'h') {
      this.y -= 20;
    } else {
      this.x -= 20;
    }
  }
}

export default Player;
