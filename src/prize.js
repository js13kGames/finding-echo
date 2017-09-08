
import Dispatcher from './dispatcher';
import Vector from './vector';

class Prize {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 10;
    this.isCollidable = true;
    this.isPrize = true;

    this.onSearch = this.onSearch.bind(this);

    Dispatcher.on('SEARCH', (ev) => { this.onSearch(ev.data) });
  }

  onSearch(data) {
    const pos = data.pos;
    const center = new Vector(
      this.x - this.w / 2,
      this.y - this.h / 2);
    this.callBack(center);
  }

  callBack(position) {
    Dispatcher.emit('CALLBACK', { data: { position }});
  }
}

export default Prize;
