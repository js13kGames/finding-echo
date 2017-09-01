
import Vector from './vector';

class Wall {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.orientation = (w > h) ? 'h' : 'v';
    this.isWall = true;
    if (this.orientation === 'h') {
      this.points = [
        new Vector(x, y),
        new Vector(x + w, y)
      ];
    } else {
      this.points = [
        new Vector(x, y),
        new Vector(x, y + h)
      ];
    }
  }
}


export default Wall;
