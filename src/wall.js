

class Wall {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.orientation = (w > h) ? 'h' : 'v';
  }
}


export default Wall;
