
import Vector from './vector';

class Wall {
  constructor(x, y, w, h) {
    this.name = (Math.random().toString(36)+'00000000000000000').slice(2, 3+2);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    if (!h) {
    }
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
