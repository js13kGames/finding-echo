
import Dispatcher from './dispatcher';
import Vector from './vector';

class BubbleManager {
  constructor() {
    this.bubbles = [];
    this.numBubbles = 10;
    this.minSize = 5;
    this.maxSize = 10;
    this.minPos = 0;
    this.maxPos = 50;
    this.movement = new Vector(0, 0);

    for (let i = 0; i < this.numBubbles; i++) {
      let size = this.minSize + Math.floor(Math.random() * (this.maxSize + 1));
      let pos = new Vector(
        this.minPos + Math.floor(Math.random() * (this.maxPos + 1)),
        this.minPos + Math.floor(Math.random() * (this.maxPos + 1))
      );
      this.initBubble(size, pos);
    }
    this.move = this.move.bind(this);
    this.stop = this.stop.bind(this);
    Dispatcher.on('MOVE', (ev) => this.move(ev.data.direction));
    Dispatcher.on('STOP', this.stop);
  }

  initBubble(size, pos) {
    // 'filter' : 'blur(' + blur_rand  + 'px)',
    const container = document.getElementById('main');
    const el = document.createElement('div');
    el.classList.add('bubble');
    el.setAttribute('style',
      'height: ' + size + 'px;' +
      'transform: translateX(' + pos.x + 'rem) ' +
        'translateY(' + pos.y + 'rem);' +
      'width: ' + size + 'px;'
    );
    el.dataset.x = pos.x;
    el.dataset.y = pos.y;
    container.appendChild(el);
    this.bubbles.push(el);
  }

  update() {
    if (this.movement.x !== 0 || this.movement.y !== 0) {
      this.bubbles.forEach((bubble) => {
        const curX = parseFloat(bubble.dataset.x, 10);
        const curY = parseFloat(bubble.dataset.y, 10);
        let newX = curX - this.movement.x;
        let newY = curY + this.movement.y;
        if (newX > this.maxPos) newX = this.minPos + 1;
        if (newX < this.minPos) newX = this.maxPos - 1;
        if (newY > this.maxPos) newY = this.minPos + 1;
        if (newY < this.minPos) newY = this.maxPos - 1;
        bubble.style.transform = 'translateX('+ newX + 'rem) translateY(' + newY + 'rem)';
        bubble.dataset.x = newX;
        bubble.dataset.y = newY;
      });
    }
  }

  move(force) {
    this.movement = force;
  }

  stop() {
    this.movement = new Vector(0, 0);
  }
}

export default BubbleManager;
