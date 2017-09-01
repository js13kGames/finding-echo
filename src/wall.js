
import Vector from './vector';

class Wall {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.points = [
      new Vector(x, y),
      new Vector(x + w, y),
      new Vector(x, y + h),
      new Vector(x + w, y + h)
    ];
    this.orientation = (w > h) ? 'h' : 'v';
  }
}


export default Wall;
