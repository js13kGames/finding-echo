
import Vector from './vector';

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.movement = new Vector(0, 0);
  }

  move(x, y) {
    this.movement = new Vector(x, y);
  }

  update() {
    if (this.movement.x > 0) this.x += this.movement.x;
    if (this.movement.y > 0) this.y += this.movement.y;
  }
}

export default Player;
