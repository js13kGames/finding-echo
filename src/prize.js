
import EventEmitter from 'event-emitter-es6';

import Dispatcher from './dispatcher';
import Vector from './vector';

class Prize extends EventEmitter {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 20;
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
